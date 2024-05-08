import { getSession } from "next-auth/react";

export const getToken = async () => {
  const session = await getSession();
  const token = session?.accessToken;

  return token;
};
