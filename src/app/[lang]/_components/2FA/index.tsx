"use client";

import { useState, type FC } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import EnableModal from "./EnableModal";
import DisableModal from "./DisableModal";
import { useTranslate } from "@/locales";

type TwoFAProps = {
  isEnable: boolean;
};

const TwoFA: FC<TwoFAProps> = ({ isEnable }) => {
  const [openEnable, setOpenEnable] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);
  const { t } = useTranslate();

  const closeEnableModal = () => {
    setOpenEnable(false);
  };
  const closeDisableModal = () => {
    setOpenDisable(false);
  };
  const handleClick = () => {
    if (isEnable) {
      setOpenDisable(true);
    } else {
      setOpenEnable(true);
    }
  };
  return (
    <>
      {openEnable && <EnableModal open={openEnable} close={closeEnableModal} />}
      {openDisable && <DisableModal open={openDisable} close={closeDisableModal} />}

      <Stack
        onClick={handleClick}
        direction={"row"}
        sx={{ borderBottom: "1px solid", borderColor: "dark.3", width: "100%", py: 2, cursor: "pointer" }}
        gap={2}
      >
        <Icon name={isEnable ? "Password--green" : "Password"} />

        <Typography variant="p2-medium">{isEnable ? "Disable 2FA" : t("profileDialog.enable2FA")}</Typography>

        <IconButton sx={{ ml: "auto" }}>
          <Icon name="Arrow-right" />
        </IconButton>
      </Stack>
    </>
  );
};

export default TwoFA;
