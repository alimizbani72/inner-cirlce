import { getServerSession } from "next-auth";
import HomePageSection from "./_sections";
import { authOptions } from "@/configs/authOptions";

// ----------------------------------------------------------------------

export const metadata = {
  title: "ChainMind - Unlock The Secret With Expert Crypto Guidance!",
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return <HomePageSection isLogin={!!session?.accessToken} />;
}
