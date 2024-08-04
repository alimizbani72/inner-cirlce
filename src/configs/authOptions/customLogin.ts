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
        }),
      });

      const result = await response.json();
      if (response.status === 200 && result.success) {
        return result.data;
      }
    } catch (_error) {
      throw new Error("Failed to fetch user");
    }
    return null;
  },
};
