import { minecraftEndpoint } from "@/consts";

export const customLogin = {
  id: "custom-login",
  type: "credentials" as "credentials",
  credentials: {},
  async authorize(credentials: any) {
    try {
      const response = await fetch(`${minecraftEndpoint}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
          otp: credentials?.otp ? credentials.otp : null,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success && result.data) {
        return result.data;
      }

      if (response.status === 200 && result.success && !result.data) {
        throw new Error("2FA_REQUIRED");
      }
    } catch (error) {
      if (error.message === "2FA_REQUIRED") {
        throw new Error("2FA_REQUIRED");
      }
      throw new Error("Failed to fetch user");
    }
    return null;
  },
};
