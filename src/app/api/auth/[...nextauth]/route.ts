import type { NextApiResponse } from "next";
import NextAuth from "next-auth";
import { parse } from "cookie";
import { authOptions } from "@/configs/authOptions";

async function auth(req: any, res: NextApiResponse) {
  const cookies = parse(req?.headers?.get?.("cookie") || "");

  return await NextAuth(req, res, authOptions(cookies));
}

export { auth as GET, auth as POST };
