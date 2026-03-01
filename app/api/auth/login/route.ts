import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { prisma } from "@/shared/lib/prisma";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // если пароль отсутствует - пользователь зарегистрирован через OAuth
    if (!user.password) {
      throw new Error("User registered via OAuth provider");
    }

    if (user && user.password === null) {
      return NextResponse.json(
        {
          message:
            "This account was created with Google. Please sign in with Google.",
          oauth_required: true,
        },
        { status: 400 },
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const response = NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Log in error:", error);
    return NextResponse.json(
      { error: "Something went wrong during log in" },
      { status: 500 },
    );
  }
}
