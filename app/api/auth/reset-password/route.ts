import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { prisma } from "@/shared/lib/prisma";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";

const resetSchema = z.object({
  token: z.string(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .trim(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = resetSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    const { newPassword, token } = parsed.data;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const resetToken = await prisma.passwordResetToken.findFirst({
      where: { tokenHash },
    });

    if (!resetToken) {
      return NextResponse.json(
        {
          error: "Invalid or expired reset link",
        },
        { status: 400 },
      );
    }

    const now = new Date();

    if (resetToken?.expiresAt <= now) {
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });

      return NextResponse.json({ error: "Token expired" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordResetToken.deleteMany({
        where: { id: resetToken.userId },
      }),
    ]);

    return NextResponse.json(
      { message: "Password successfully reset." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Change password:", error);
    return NextResponse.json(
      { error: "Something went wrong during reset password." },
      { status: 500 },
    );
  }
}
