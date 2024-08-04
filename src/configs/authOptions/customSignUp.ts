import { minecraftEndpoint } from "@/consts";

export const customSingUp = (cookies: any) => ({
  id: "custom-signup",
  type: "credentials" as "credentials",
  credentials: {},
  name: "credentials",
  async authorize(credentials: any) {
    try {
      const response = await fetch(`${minecraftEndpoint}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: credentials?.full_name,
          password: credentials?.password,
          email: credentials?.email,
          policy_approved: !!credentials.policy_approved,
          session_code: credentials?.session_code,
          referral_code: cookies?.referral_code,
        }),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        return result.data;
      }
    } catch (_error) {
      throw new Error("Failed to register user");
    }
    return null;
  },
});
