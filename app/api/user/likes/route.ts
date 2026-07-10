import { prisma } from "@/shared/lib/prisma";
import { requireAuth } from "@/shared/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let user;
    try {
      user = requireAuth(req);
    } catch (error) {
      return NextResponse.json(
        { message: "Auth access required" },
        { status: 403 },
      );
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { message: "Product id not found" },
        { status: 404 },
      );
    }

    const likedProduct = await prisma.likedProduct.findUnique({
      where: {
        userId_productId: {
          userId: user.userId,
          productId: productId,
        },
      },
    });

    if (likedProduct) {
      return NextResponse.json(
        { message: "This product cant be added to favorites twice" },
        { status: 400 },
      );
    }

    const product = await prisma.likedProduct.create({
      data: {
        userId: user.userId,
        productId: productId,
      },
    });

    return NextResponse.json({ product: product }, { status: 201 });
  } catch (error) {
    console.error("Add product to favorite are failed:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    let user;
    try {
      user = requireAuth(req);
    } catch (error) {
      return NextResponse.json(
        { message: "Auth access required" },
        { status: 403 },
      );
    }

    const page = Math.max(
      1,
      parseInt(req.nextUrl.searchParams.get("page") || "1"),
    );
    const limit = Math.min(
      24,
      Math.max(1, parseInt(req.nextUrl.searchParams.get("limit") || "12")),
    );
    const skip = (page - 1) * limit;

    const total = await prisma.likedProduct.count({
      where: { userId: user.userId },
    });

    const products = await prisma.likedProduct.findMany({
      where: { userId: user.userId },
      include: {
        product: {
          include: {
            images: true,
            category: true,
            brand: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    const aggregate = await prisma.likedProduct.findMany({
      where: { userId: user.userId },
      include: { product: { select: { price: true } } },
    });

    const totalPrice = aggregate.reduce(
      (sum, item) => sum + item.product.price,
      0,
    );

    return NextResponse.json(
      {
        products,
        totalPrice,
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
    console.error("Fail to get favorites products:", error);

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
}
