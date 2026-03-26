import { prisma } from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const created = searchParams.get("created");
    const attributeParams = searchParams.getAll("attributes");
    const slug = searchParams.get("slug");

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { brand: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (slug) {
      where.category = { slug };
    }

    if (created) {
      where.createdAt = {
        gte: new Date(created),
        lt: new Date(
          new Date(created).setDate(new Date(created).getDate() + 1),
        ),
      };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = {
      createdAt: "desc",
    };

    if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "name_asc") {
      orderBy = { title: "asc" };
    } else if (sort === "name_desc") {
      orderBy = { title: "desc" };
    }

    if (attributeParams.length > 0) {
      const parsed = attributeParams.map((attr) => {
        const [name, value] = attr.split(":");
        return { name, value };
      });

      where.AND = parsed.map(({ name, value }) => ({
        attributes: {
          some: {
            name,
            value,
          },
        },
      }));
    }

    const page = Math.max(
      1,
      parseInt(req.nextUrl.searchParams.get("page") || "1"),
    );
    const limit = Math.min(
      20,
      Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "12")),
    );
    const skip = (page - 1) * limit;

    const total = await prisma.product.count({
      where: {
        ...where,
        status: "ACTIVE",
      },
    });

    console.time("products query");

    const products = await prisma.product.findMany({
      where: { ...where, status: "ACTIVE" },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
        content: { select: { descriptionHtml: true } },
        attributes: { select: { name: true, value: true } },
        images: {
          select: { url: true, position: true },
          orderBy: { position: "asc" },
        },
        category: { select: { id: true, name: true, slug: true } },
        brand: { select: { id: true, name: true } },
      },
      orderBy,
      skip,
      take: limit,
    });

    console.timeEnd("products query");
    console.log("products count:", products.length);

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No products found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
