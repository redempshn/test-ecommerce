import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const slug = searchParams.get("slug");

    const category = await prisma.category.findUnique({
      where: { slug: slug ?? "" },
    });

    if (!category) {
      return NextResponse.json(
        { message: "Category not found." },
        { status: 404 },
      );
    }

    const attributes = await prisma.productAttribute.findMany({
      where: {
        product: {
          categoryId: category.id,
          status: "ACTIVE",
        },
      },
      select: {
        name: true,
        value: true,
      },
    });

    const grouped = attributes.reduce(
      (acc, attr) => {
        if (!acc[attr.name]) {
          acc[attr.name] = [];
        }

        if (!acc[attr.name].includes(attr.value)) {
          acc[attr.name].push(attr.value);
        }

        return acc;
      },
      {} as Record<string, string[]>,
    );

    const result = Object.entries(grouped).map(([name, values]) => ({
      name,
      values,
    }));

    return NextResponse.json({ filters: result }, { status: 200 });
  } catch (error) {
    console.error("Category not found:", error);
    return NextResponse.json(
      { message: "Something went wrong during get category." },
      { status: 500 },
    );
  }
}
