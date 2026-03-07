import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  role: string;
}

export function verifyAuth(req: NextRequest): JwtPayload | null {
  const token = req.cookies.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return decoded;
  } catch {
    return null;
  }
}

export function requireAuth(req: NextRequest): JwtPayload {
  const user = verifyAuth(req);

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export function requireAdmin(req: NextRequest): JwtPayload {
  const user = requireAuth(req);

  if (user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  return user;
}
