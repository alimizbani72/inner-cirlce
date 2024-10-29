"use client";

import { SplashScreen } from "@/components/loading-screen";
import { useTranslate } from "@/locales";
import NotFoundSection from "@app/_sections/NotFound";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";

const GuestSection = () => {
  const { t } = useTranslate();
  const searchParams = useSearchParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    signIn("guest-login", {
      token: searchParams.get("token") || "",
      redirect: false,
    }).then((res) => {
      if (res?.ok) {
        window.location.href = "/dashboard";
      } else {
        setError(true);
        enqueueSnackbar(t("formErrors.formError"), {
          variant: "error",
        });
      }
    });
  }, [searchParams, t]);

  return <>{error ? <NotFoundSection /> : <SplashScreen />}</>;
};

export default GuestSection;
