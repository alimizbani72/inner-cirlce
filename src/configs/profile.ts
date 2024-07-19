import { resolvePathJoin } from "@/utils/path";

export const profileMenuItems = [
  {
    title: "profileSetting",
    path: "/settings",
    icon: "Settings",
  },
  // {
  //   title: "Help & Support",
  //   path: "/help-support",
  //   icon: "headphones-support",
  // },
  {
    title: "termsOfService",
    path: resolvePathJoin(process.env.NEXT_PUBLIC_URL!, "terms-and-condition") ,
    icon: "Warning-round",
  },
  {
    title: "becomePartner",
    path: "/become-partner",
    icon: "Hand",
  },
];
