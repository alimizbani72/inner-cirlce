import localFont from "next/font/local";

export const primaryFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/montserrat/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  fallback: ["Arial", "Helvetica Neue", "sans-serif"],
  display: "swap",
});
