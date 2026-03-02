import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  try {
    const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;

    if (!FACEBOOK_CLIENT_ID) {
      return NextResponse.json(
        { message: "Facebook OAuth not configured" },
        { status: 500 },
      );
    }

    const state = crypto.randomBytes(32).toString("hex");

    const facebookAuthUrl = new URL(
      "https://www.facebook.com/v19.0/dialog/oauth",
    );

    facebookAuthUrl.searchParams.set(
      "client_id",
      process.env.FACEBOOK_CLIENT_ID!,
    );
    facebookAuthUrl.searchParams.set(
      "redirect_uri",
      process.env.FACEBOOK_REDIRECT_URL!,
    );
    facebookAuthUrl.searchParams.set("response_type", "code");
    facebookAuthUrl.searchParams.set("scope", "email,public_profile");
    facebookAuthUrl.searchParams.set("state", state);

    const response = NextResponse.redirect(facebookAuthUrl.toString());

    response.cookies.set("oauth_state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Facebook OAuth error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL}/signin?error=oauth_failed`,
    );
  }
}
