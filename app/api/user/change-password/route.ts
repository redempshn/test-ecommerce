// Backend:
// проверяет JWT
// находит пользователя
// сравнивает currentPassword с хешем в БД
// валидирует новый пароль
// хеширует новый пароль
// обновляет запись в БД
// Возвращает success
// (опционально) инвалидирует старые сессии

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";
import jwt from "jsonwebtoken";
import * as z from "zod";
import * as bcrypt from "bcrypt";

interface JwtPayload {
  userId: number;
}

const ResetPasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .trim(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .trim(),
});

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Not authorized" }, { status: 401 });
    }

    let decoded: JwtPayload;

    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

    try {
      decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = ResetPasswordSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    const { oldPassword, newPassword } = parsed.data;

    if (oldPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from old password" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    const response = NextResponse.json(
      { message: "Password changed" },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0), // делает cookie просроченной
    });

    return response;
  } catch (error) {
    console.error("Change password:", error);
    return NextResponse.json(
      { error: "Something went wrong during changing password." },
      { status: 500 },
    );
  }
}
