"use client";

import CustomDialog from "@/components/CustomDialog";
import useCustomRouter from "@/hooks/useCustomRouter";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

const ProfileDialog: FC<PropsWithChildren> = ({ children }) => {
  const pathName = usePathname();

  const { back } = useCustomRouter();

  return (
    <CustomDialog
      fullWidth
      maxWidth="sm"
      aria-labelledby="custom-dialog"
      open={pathName.includes("/profile/")}
      onClose={back}
    >
      {children}
    </CustomDialog>
  );
};
export default ProfileDialog;
