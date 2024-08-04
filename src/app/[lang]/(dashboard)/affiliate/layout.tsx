import type { PropsWithChildren } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/configs/authOptions";
// ----------------------------------------------------------------------

export default async function AffiliateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions(""));

  if (!session?.user?.kyc_status) {
    return notFound();
  }

  return <>{children}</>;
}
