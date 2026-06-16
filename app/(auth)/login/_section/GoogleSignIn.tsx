// "use client";

// import { signInGoogle } from "@/auth";
// import { useTranslate } from "@/locales";
// import { useAppRouter } from "@/routes/hooks";
// import { Stack } from "@mui/material";
// import { type CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { useLayoutEffect, useRef, useState } from "react";
// import { toast } from "sonner";

// const GoogleSignIn = () => {
//   const router = useAppRouter();
//   const { t } = useTranslate();
//   const stackRef = useRef<HTMLDivElement>(null);
//   const [width, setWidth] = useState<number | undefined>(undefined);

//   useLayoutEffect(() => {
//     if (stackRef.current) {
//       setWidth(stackRef.current.clientWidth);
//     }
//   }, []);

//   const onSuccess = async (credentialResponse: CredentialResponse) => {
//     try {
//       await signInGoogle({
//         token: credentialResponse.credential!,
//       });
//       router.push("/dashboard");
//     } catch (_error) {
//       toast.error(t("login.errorLoginWithGoogle"));
//     }
//   };

//   return (
//     <Stack ref={stackRef}>
//       <GoogleLogin
//         theme={"outline"}
//         width={width}
//         shape="rectangular"
//         useOneTap={false}
//         onSuccess={onSuccess}
//         onError={() => {
//           toast.error(t("login.errorLoginWithGoogle"));
//         }}
//       />
//     </Stack>
//   );
// };

// export default GoogleSignIn;
