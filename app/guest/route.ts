import { STORAGE_KEY } from "@/auth";
import { type NextRequest, NextResponse } from "next/server";

// Function to encrypt token (replicated from CookieUtils)
function encryptToken(token: string): string {
  try {
    const SALT =
      process.env.NEXT_PUBLIC_SALT_KEY || "~c&>&q6?(eR:pLWUmuE}G]~RwtFdgc^T";
    // Simple but effective encryption using timestamp as nonce
    const timestamp = new Date().getTime().toString();
    const nonce = timestamp.slice(-8);
    const encodedToken = Buffer.from(token).toString("base64");
    const signature = Buffer.from(token + SALT + nonce).toString("base64");

    return `${encodedToken}.${nonce}.${signature}`;
  } catch (error) {
    console.error("Encryption failed:", error);
    return token;
  }
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  // Get the base URL from environment variable or use the origin from the request
  const baseUrl =
    process.env.NEXT_PUBLIC_URL ||
    request.headers.get("origin") ||
    request.nextUrl.origin;

  if (!token) {
    // Redirect to not-found using the same baseUrl approach
    const notFoundUrl = `${baseUrl}/not-found`;
    console.log("Redirecting to not-found:", notFoundUrl);
    return NextResponse.redirect(notFoundUrl);
  }

  const encryptedToken = encryptToken(token);

  // Create the redirect URL
  const redirectUrl = `${baseUrl}/dashboard`;
  console.log("Redirecting to dashboard:", redirectUrl);

  const response = NextResponse.redirect(redirectUrl);

  // Set the cookie
  response.cookies.set({
    name: STORAGE_KEY,
    value: encryptedToken,
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 days
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: false, // Making it accessible via JavaScript
  });

  return response;
}
