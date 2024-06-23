// src/app/api/generate-hmac/route.ts
import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const secretKey = process.env.INTERCOM_SECRET!;
  const hash = crypto.createHmac("sha256", secretKey).update(email).digest("hex");

  return NextResponse.json({ hash });
}
