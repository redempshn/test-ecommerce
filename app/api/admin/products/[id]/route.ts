import { prisma } from "@/shared/lib/prisma";
import { requireAdmin } from "@/shared/utils/auth";
import { ProductFormSchema } from "@/shared/validations/product.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const productId = parseInt(id);

    if (!productId) {
      return NextResponse.json(
        { message: "Product id not found" },
        { status: 404 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        content: true,
        attributes: true,
        images: true,
        category: true,
        brand: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Get product by id error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const productId = parseInt(id);

    if (!productId) {
      return NextResponse.json(
        { message: "Product id not found" },
        { status: 404 },
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        content: true,
        attributes: true,
        images: true,
        category: true,
        brand: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
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

    const editProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        slug,
        price,
        stock,
        status,
        categoryId,
        brandId,

        content: {
          upsert: {
            create: { descriptionHtml },
            update: { descriptionHtml },
          },
        },

        attributes: {
          deleteMany: {},
          create: attributes.map((attr) => ({
            name: attr.name,
            value: attr.value,
          })),
        },

        images: {
          deleteMany: {},
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

    return NextResponse.json({ product: editProduct }, { status: 200 });
  } catch (error) {
    console.error("Edit product error:", error);

    return NextResponse.json(
      { message: "Something went wrong", detail: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

    const { id } = await params;
    const productId = parseInt(id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
