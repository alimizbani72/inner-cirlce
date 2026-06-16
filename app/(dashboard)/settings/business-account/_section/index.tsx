"use client";
import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { useGetMe } from "@/services/minecraft/default/default";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import BusinessAccountDialog from "./BusinessAccountDialog";
import RenderContent from "./RenderContent";

const BusinessAccountSection = () => {
  const { data, isLoading } = useGetMe();
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslate();

  return (
    <>
      <Stack
        justifyContent="center"
        alignItems="center"
        p={{ md: 4, xs: 3 }}
        gap={{ md: 4, xs: 3 }}
      >
        <Stack
          width={1}
          gap={2}
          justifyContent="space-between"
          alignItems={{ md: "center" }}
          direction={{ md: "row" }}
        >
          <Typography variant="p1-medium" color="white">
            {t("businessAccount.businessAccount")}
          </Typography>

          <Button
            size="large"
            color="tertiary"
            startIcon={<Icon name="PenIcon" />}
            onClick={() => setOpenDialog(true)}
          >
            {t("businessAccount.changeInfo")}
          </Button>
        </Stack>
      </Stack>
      <RenderContent
        businessInfo={data?.data?.business_info}
        isLoading={isLoading}
      />

      {openDialog && (
        <BusinessAccountDialog
          open={openDialog}
          close={() => setOpenDialog(false)}
        />
      )}
    </>
  );
};

export default BusinessAccountSection;
