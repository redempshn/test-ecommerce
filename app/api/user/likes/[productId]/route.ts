import { prisma } from "@/shared/lib/prisma";
import { requireAuth } from "@/shared/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
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

    const { productId } = await params;
    const productIdNumber = parseInt(String(productId));

    if (!productId) {
      return NextResponse.json(
        { message: "Product id not found" },
        { status: 404 },
      );
    }

    await prisma.likedProduct.delete({
      where: {
        userId_productId: {
          userId: user.userId,
          productId: productIdNumber,
        },
      },
    });

    return NextResponse.json(
      { message: "Product deleted", productId: productIdNumber },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete liked product error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
