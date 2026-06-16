"use client";
export type SignInParams = {
  email: string;
  password: string;
  otp?: string;
  push: (href: string) => void;
  callback?: VoidFunction;
};

export type SignUpParams = {
  email: string;
  password: string;
  full_name: string;
  otp?: string;
  policy_approved?: boolean;
  push: (href: string) => void;
};

export type GoogleParams = {
  token: string;
};

/** **************************************
 * Sign in
 *************************************** */
// export const signIn = async ({
//   email,
//   password,
//   otp,
//   callback,
//   push,
// }: SignInParams): Promise<void> => {
//   try {
//     const params = { email, password, otp };

//     const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.login, params);

//     const { data: accessToken, meta } = res.data as PostAuthLogin200AllOf;

//     if (accessToken) {
//       setAuthCookie(accessToken);
//       push('/dashboard');
//     } else if (meta?.has_2fa) {
//       callback?.();
//     }
//   } catch (error) {
//     throw error;
//   }
// };
// export const signIn = async ({
//   email,
//   password,
//   callback,
//   push,
// }: SignInParams): Promise<void> => {
//   await new Promise((res) => setTimeout(res, 800));

//   // 🔐 fake database
//   const fakeUser = {
//     email: "test@test.com",
//     password: "123456",
//     has2FA: false,
//   };

//   const fake2FAUser = {
//     email: "2fa@test.com",
//     password: "123456",
//     has2FA: true,
//   };

//   // ❌ invalid credentials
//   if (
//     (email === fakeUser.email && password !== fakeUser.password) ||
//     (email === fake2FAUser.email && password !== fake2FAUser.password) ||
//     (email !== fakeUser.email && email !== fake2FAUser.email)
//   ) {
//     throw new Error("Invalid credentials");
//   }

//   // 🔐 2FA flow
//   if (email === fake2FAUser.email && fake2FAUser.has2FA) {
//     callback?.();
//     return;
//   }

//   // ✅ success
//   localStorage.setItem("accessToken", "mock-token-123");
//   push("/dashboard");
// };

/** **************************************
 * Sign up
 *************************************** */
// export const signUp = async ({
//   email,
//   password,
//   full_name,
//   otp,
//   push,
// }: SignUpParams): Promise<void> => {
//   const params = {
//     email,
//     password,
//     full_name,
//     otp,
//   };

//   try {
//     const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.register, params);

//     const { data: accessToken } = res.data;

//     if (accessToken) {
//       setAuthCookie(accessToken);
//       push("/dashboard");
//     }
//   } catch (error) {
//     throw error;
//   }
// };

// /** **************************************
//  * Google sign in
//  *************************************** */
// export const signInGoogle = async ({ token }: GoogleParams): Promise<void> => {
//   const params = {
//     token,
//   };

//   try {
//     const res = await AXIOS_INSTANCE.post(AUTH_ROUTES_API.google, params);

//     const { data: accessToken } = res.data;
//     if (!accessToken) {
//       throw new Error("Access token not found in response");
//     }

//     setAuthCookie(accessToken);
//   } catch (error) {
//     throw error;
//   }
// };

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async (): Promise<void> => {
  try {
    removeToken();
  } catch (error) {
    console.error("Error during sign out:", error);
    throw error;
  }
};
export const removeToken = () => {
  localStorage.removeItem("token");
};

export const signIn = async ({ email, password, router, callback }: any) => {
  await new Promise((res) => setTimeout(res, 500));

  console.log("SIGNIN RUN", { email, password });

  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  localStorage.setItem("token", "mock-token-123");

  if (callback) {
    callback();
  }

  router.replace("/dashboard");
};
