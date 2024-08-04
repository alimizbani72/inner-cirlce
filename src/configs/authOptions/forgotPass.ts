import { minecraftEndpoint } from "@/consts";

export const forgotPass = {
  id: "forgot-pass",
  type: "credentials" as "credentials",
  credentials: {},
  name: "credentials",
  async authorize(credentials: any) {
    try {
      const response = await fetch(`${minecraftEndpoint}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
          session_code: credentials?.session_code,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        return result.data;
      }
    } catch (_error) {
      throw new Error("Failed to reset password");
    }
    return null;
  },
};
