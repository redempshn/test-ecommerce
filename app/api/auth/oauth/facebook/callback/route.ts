import { prisma } from "@/shared/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";

interface fbUser {
  id: string;
  name: string;
  email: string;
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

    const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
    const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

    if (!FACEBOOK_CLIENT_ID || !FACEBOOK_CLIENT_SECRET) {
      throw new Error("Facebook OAuth credentials not configured");
    }

    const tokenResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
        new URLSearchParams({
          client_id: process.env.FACEBOOK_CLIENT_ID!,
          client_secret: process.env.FACEBOOK_CLIENT_SECRET!,
          redirect_uri: process.env.FACEBOOK_REDIRECT_URL!,
          code,
        }),
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to exchange code for token");
    }

    const { access_token } = await tokenResponse.json();

    const userResponse = await fetch(
      `https://graph.facebook.com/me?` +
        new URLSearchParams({
          fields: "id,name,email",
          access_token: access_token,
        }),
    );

    if (!userResponse.ok) {
      throw new Error("Failed to fetch user info from Facebook");
    }

    const facebookUser: fbUser = await userResponse.json();

    // Поиск/создание пользователя в БД
    let user = await prisma.user.findUnique({
      where: { facebookId: facebookUser.id },
    });

    // Если нет по googleId, ищем по email
    if (!user) {
      user = await prisma.user.findUnique({
        where: { email: facebookUser.email },
      });

      // Если нашли по email, привязываем googleId
      if (user) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            facebookId: facebookUser.id,
          },
        });
      }
    }

    // Если пользователя всё ещё нет — создаём нового
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: facebookUser.email,
          name: facebookUser.name,
          googleId: facebookUser.id,
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

    const response = NextResponse.redirect(
      `${process.env.FACEBOOK_REDIRECT_URL}`,
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 дней
    });

    response.cookies.delete("oauth_state");

    return response;
  } catch (error) {
    console.error("Facebook OAuth callback error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/signin?error=oauth_failed`,
    );
  }
}
