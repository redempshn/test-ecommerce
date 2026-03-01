import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { prisma } from "@/shared/lib/prisma";
import jwt from "jsonwebtoken";

const updateSchema = z.object({
  email: z.string().email().toLowerCase().trim().optional(),
  name: z.string().min(2).trim().toLowerCase().optional(),
});

interface JwtPayload {
  userId: number;
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const parsed = updateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    const { email, name } = parsed.data;

    if (!email && !name) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 },
      );
    }
    if (email && email !== user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "Email already in use" },
          { status: 400 },
        );
      }
    }

    const dataToUpdate: { email?: string; name?: string } = {};

    if (email) dataToUpdate.email = email;
    if (name) dataToUpdate.name = name;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: dataToUpdate,
    });

    return NextResponse.json(
      {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("fail to update user data:", error);
    return NextResponse.json(
      { error: "Something went wrong during updating user data" },
      { status: 500 },
    );
  }
}
