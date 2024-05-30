// sections
import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/configs/authOptions";
// import { Typography } from "@mui/material";
// import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: "Chainmind",
};

export default async function HomePage() {
  // const session = await getServerSession(authOptions);

  // if (!session?.accessToken) {
  //   return redirect("/login");
  // }

  // return (
  //   <Typography color="white" variant="h1-medium">
  //     The quick brown fox jumps over the lazy.
  //   </Typography>
  // );
  redirect("/dashboard");
}
