import Image from "@/components/Image";
import { Button, Stack, Typography } from "@mui/material";
import { type FC, useState } from "react";
import BusinessAccountDialog from "./BusinessAccountDialog";
import { useTranslate } from "@/locales";

interface RequestCardProps {}

const steps = [
  "1. Legal and Regulatory Compliance",
  "2. Account Usage",
  "3. Compliance and Reporting",
  "4. Fees and Charges",
  "5. Account Security",
  "6. Limitations and Restrictions",
];

const RequestCard: FC<RequestCardProps> = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslate();
  return (
    <>
      <Stack maxWidth={{ md: 360 }} gap={3} justifyContent="center">
        <Image src="/assets/png/business.png" />
        <Stack gap={1}>
          <Typography variant="p2-semi-bold">{t("businessaccount.whatyouWillGet")}</Typography>
          {steps.map((step) => (
            <Typography key={step} variant="p2-regular">
              {step}
            </Typography>
          ))}
        </Stack>
        <Button fullWidth onClick={() => setOpenDialog(true)}>
          {t("businessaccount.makemyAccountTobusiness")}
        </Button>
      </Stack>
      {openDialog && <BusinessAccountDialog open={openDialog} close={() => setOpenDialog(false)} />}
    </>
  );
};

export default RequestCard;
