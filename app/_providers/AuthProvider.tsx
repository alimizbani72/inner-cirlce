"use client";

import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

const authRoutes = ["/login", "/register"];

export default function AuthProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);
  // ✅ wait until client is ready
  const token = hydrated ? localStorage.getItem("token") : null;
  useEffect(() => {
    if (!hydrated) {
      return;
    }

    const isPublic = authRoutes.includes(pathname);

    if (!token && !isPublic) {
      router.replace("/login");
    }

    if (token && isPublic) {
      router.replace("/dashboard");
    }
  }, [token, pathname, hydrated, router]);

  // optional: prevent flicker
  if (!hydrated) {
    return null;
  }

  return <>{children}</>;
}
