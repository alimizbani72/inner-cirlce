import type { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/configs/authOptions";
import LadingLayoutSection from "./_section";
// ----------------------------------------------------------------------

export type LayoutProps = {
  children: ReactNode;
};

export default async function LandingLayout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions(""));

  return <LadingLayoutSection isLogin={!!session?.accessToken}>{children}</LadingLayoutSection>;
}
