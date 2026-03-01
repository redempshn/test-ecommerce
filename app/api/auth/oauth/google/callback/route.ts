import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/shared/lib/prisma";
import { Role } from "@prisma/client";

interface GoogleUser {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    // Проверка на ошибки от Google
    if (error) {
      console.error("Google OAuth error:", error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/signin?error=oauth_cancelled`,
      );
    }

    // Проверка наличия code
    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/signin?error=no_code`,
      );
    }

    // CSRF защита: проверка state
    const savedState = req.cookies.get("oauth_state")?.value;

    if (!state || state !== savedState) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/signin?error=invalid_state`,
      );
    }

    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth/google/callback`;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      throw new Error("Google OAuth credentials not configured");
    }

    // Обмен code на access_token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const { access_token } = await tokenResponse.json();

    // Получение данных пользователя от Google
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user info from Google");
    }

    const googleUser: GoogleUser = await userResponse.json();

    // Проверка что email подтверждён
    if (!googleUser.verified_email) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL}/signin?error=email_not_verified`,
      );
    }

    // Поиск/создание пользователя в БД
    let user = await prisma.user.findUnique({
      where: { googleId: googleUser.id },
    });

    // Если нет по googleId, ищем по email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: googleUser.email },
      });

      // Если нашли по email, привязываем googleId
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleUser.id,
          },
        });
      }
    }

    // Если пользователя всё ещё нет — создаём нового
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          googleId: googleUser.id,
          password: null, // OAuth пользователи без пароля
          role: Role.USER,
        },
      });
    }

    // Генерируем JWT токен
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not configured");
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

    // Создаём response с редиректом на главную
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/`,
    );

    // Устанавливаем http-only cookie с токеном
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    // Удаляем временную oauth_state cookie
    response.cookies.delete("oauth_state");

    return response;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/signin?error=oauth_failed`,
    );
  }
}
