import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const REDIRECT_URI = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/oauth/google/callback`;

    if (!GOOGLE_CLIENT_ID) {
      return NextResponse.json(
        { message: "Google OAuth not configured" },
        { status: 500 },
      );
    }

    const state = crypto.randomBytes(32).toString("hex");

    const googleAuthUrl = new URL(
      "https://accounts.google.com/o/oauth2/v2/auth",
    );

    googleAuthUrl.searchParams.append("client_id", GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.append("redirect_uri", REDIRECT_URI);
    googleAuthUrl.searchParams.append("response_type", "code");
    googleAuthUrl.searchParams.append("scope", "openid email profile");
    googleAuthUrl.searchParams.append("access_type", "offline");
    googleAuthUrl.searchParams.append("prompt", "select_account");
    googleAuthUrl.searchParams.append("state", state);

    const response = NextResponse.redirect(googleAuthUrl.toString());

    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/signin?error=oauth_failed`,
    );
  }
}
