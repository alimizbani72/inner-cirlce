export const STORAGE_KEY = 'jwt_access_token';
export const googleProviderOption = {
  clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
};
export const AUTH_ROUTES_API = {
  login: '/auth/login',
  register: '/auth/register',
  google: '/auth/google-login',
};
