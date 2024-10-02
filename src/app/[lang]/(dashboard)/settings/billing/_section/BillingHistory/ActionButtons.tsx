import { Icon } from "@/components/icons";
import { useFinancialServiceBillingAddressQuery } from "@minecraft/queries";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";

import BillingAddressAlertDialog from "../AlertDialog";
import BillingAddressDialog from "../BillingAddressDialog";
import ViewInvoiceButton from "./ViewInvoiceButton";
import DownloadInvoiceButton from "./DownloadInvoiceButton";

const ActionButtons = ({ row }: any) => {
  const { data: billingInfo } = useFinancialServiceBillingAddressQuery();
  const [openBillingAddressDialog, setOpenBillingAddressDialog] = useState(false);
  const [openBillingAddressAlertDialog, setOpenBillingAddressAlertDialog] = useState(false);

  const handleSetupBillingAddress = () => {
    setOpenBillingAddressAlertDialog(true);
  };

  return (
    <>
      {billingInfo?.data?.address ? (
        <Stack gap={2} direction="row" alignItems="center" justifyContent="flex-end">
          <ViewInvoiceButton invoice={row} billingInfo={billingInfo.data} />
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#14162E" />
          </svg>
          <DownloadInvoiceButton invoice={row} billingInfo={billingInfo.data} />
        </Stack>
      ) : (
        <Stack
          direction="row"
          gap={0.5}
          alignItems="center"
          onClick={handleSetupBillingAddress}
          sx={{ cursor: "pointer" }}
        >
          <Icon name={"Home"} />
          <Typography variant="p2-medium">Set Address</Typography>
        </Stack>
      )}

      {openBillingAddressAlertDialog && (
        <BillingAddressAlertDialog
          open={openBillingAddressAlertDialog}
          close={() => setOpenBillingAddressAlertDialog(false)}
          onSubmit={() => {
            setOpenBillingAddressAlertDialog(false);
            setOpenBillingAddressDialog(true);
          }}
        />
      )}

      {openBillingAddressDialog && (
        <BillingAddressDialog open={openBillingAddressDialog} close={() => setOpenBillingAddressDialog(false)} />
      )}
    </>
  );
};

export default ActionButtons;
