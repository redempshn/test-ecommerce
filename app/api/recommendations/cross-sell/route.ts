import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const productId = Number(searchParams.get("productId"));
    const limit = Number(searchParams.get("limit")) || 4;

    if (!productId) {
      return NextResponse.json(
        { message: "ProductId is required" },
        { status: 400 },
      );
    }

    const currentProduct = await prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        categoryId: true,
      },
    });

    if (!currentProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const crossSellProducts = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        categoryId: currentProduct.categoryId,
        NOT: {
          id: currentProduct.id,
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
        images: {
          select: { url: true, position: true },
          orderBy: { position: "asc" },
        },
        category: {
          select: { id: true, name: true, slug: true },
        },
        brand: {
          select: { id: true, name: true },
        },
      },
    });

    return NextResponse.json({ products: crossSellProducts }, { status: 200 });
  } catch (error) {
    console.error("Get cross-sell products error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
