import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { prisma } from "@/shared/lib/prisma";
import * as crypto from "crypto";
import { Resend } from "resend";
import ResetEmailTemplate from "@/shared/services/templates/ResetEmailTemplate";

const PasswordResetSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase()
    .trim(),
});

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();

    const parsed = PasswordResetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    const { email } = parsed.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "If this email exists, you will receive reset instructions",
        },
        { status: 200 },
      );
    }

    if (user) {
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id },
      });

      const rawToken = crypto.randomBytes(32).toString("hex");

      const tokenHash = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      await prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}`;

      const { data, error } = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: [`${user.email}`],
        subject: "Reset your password",
        react: ResetEmailTemplate({ link: `${resetLink}` }),
      });

      if (error) {
        console.error("Resend error:", error);
      }

      console.log(data)

      return NextResponse.json(
        {
          message: "If this email exists, you will receive reset instructions",
        },
        { status: 200 },
      );
    }

  } catch (error) {
    console.error("Email exception:", error);
    return NextResponse.json(
      { error: "Something went wrong during sending email" },
      { status: 500 },
    );
  }
}
