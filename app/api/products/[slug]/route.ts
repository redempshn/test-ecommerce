import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
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
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Get product error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
