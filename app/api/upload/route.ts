import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();

    const filename = `${crypto.randomUUID()}.${ext}`;

    const filePath = path.join(process.cwd(), "public/products", filename);

    await writeFile(filePath, buffer);

    return NextResponse.json({
      url: `/products/${filename}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
