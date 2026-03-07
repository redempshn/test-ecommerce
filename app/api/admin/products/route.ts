import { prisma } from "@/shared/lib/prisma";
import { requireAdmin } from "@/shared/utils/auth";
import { ProductFormSchema } from "@/shared/validations/product.schema";
import { Prisma, ProductStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let admin;
    try {
      admin = requireAdmin(req);
    } catch {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );
    }

    const searchParams = req.nextUrl.searchParams;

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const created = searchParams.get("created");
    const status = searchParams.get("status");

    const where: Prisma.ProductWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { brand: { name: { contains: search, mode: "insensitive" } } }, // через relation
      ];
    }

    if (category) {
      where.categoryId = Number(category); // передаём id числом
    }

    // status — это enum ProductStatus, фильтруем напрямую
    if (status && status !== "all") {
      where.status = status as ProductStatus;
    }

    if (created) {
      where.createdAt = {
        gte: new Date(created),
        lt: new Date(
          new Date(created).setDate(new Date(created).getDate() + 1),
        ),
      };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };

    if (sort === "price_asc") {
      orderBy = { price: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { price: "desc" };
    } else if (sort === "name_asc") {
      orderBy = { title: "asc" };
    } else if (sort === "name_desc") {
      orderBy = { title: "desc" };
    } else if (sort === "stock_asc") {
      orderBy = { stock: "asc" };
    }

    const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") || "10")),
    );

    const skip = (page - 1) * limit;
    const take = limit;

    const total = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { message: "Somethinh went wrong during getting products" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let admin;
    try {
      admin = requireAdmin(req);
    } catch {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );
    }

    const body = await req.json();

    const parsed = ProductFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid input data",
        },
        { status: 400 },
      );
    }

    const {
      title,
      slug,
      price,
      stock,
      status,
      categoryId,
      brandId,
      descriptionHtml,
      attributes,
      images,
    } = parsed.data;

    const newProduct = await prisma.product.create({
      data: {
        title,
        slug,
        price,
        stock,
        status,
        categoryId,
        brandId,

        content: descriptionHtml
          ? {
              create: {
                descriptionHtml,
              },
            }
          : undefined,

        attributes: {
          create: attributes.map((attr) => ({
            name: attr.name,
            value: attr.value,
          })),
        },

        images: {
          create: images.map((img) => ({
            url: img.url,
            position: img.position,
          })),
        },
      },

      include: {
        content: true,
        attributes: true,
        images: true,
        category: true,
        brand: true,
      },
    });

    return NextResponse.json({ product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Product with this slug already exists" },
          { status: 409 },
        );
      }

      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "Invalid category or brand ID" },
          { status: 400 },
        );
      }
    }

    return NextResponse.json(
      { message: "Something went wrong", detail: String(error) },
      { status: 500 },
    );
  }
}
