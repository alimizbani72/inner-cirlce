export const guestLogin = {
  id: "guest-login",
  type: "credentials" as "credentials",
  credentials: {},
  async authorize(credentials: any) {
    try {
      if (credentials?.token) {
        return credentials?.token;
      }
      throw new Error("Failed to fetch user");
    } catch (_error) {
      throw new Error("Failed to fetch user");
    }
  },
};
