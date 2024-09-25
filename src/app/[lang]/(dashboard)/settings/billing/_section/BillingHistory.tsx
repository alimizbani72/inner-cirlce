import CustomTable from "@/components/CustomTable";
import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import { useFinancialServiceBillingAddressQuery, useFinancialServiceFinancialPaymentsQuery } from "@minecraft/queries";
import { Button, Stack } from "@mui/material";
import { useState, type FC } from "react";

import dynamic from "next/dynamic";
import InvoiceDocument from "./InvoiceDocument";
import BillingAddressDialog from "./BillingAddressDialog";
import BillingAddressAlertDialog from "./AlertDialog";

const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BlobProvider = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.BlobProvider), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const ActionButtons = ({ row }: any) => {
  const { data: billingInfo } = useFinancialServiceBillingAddressQuery();
  const [openBillingAddressDialog, setOpenBillingAddressDialog] = useState(false);
  const [openBillingAddressAlertDialog, setOpenBillingAddressAlertDialog] = useState(false);
  const handleSetupBillingAddress = () => {
    setOpenBillingAddressAlertDialog(true);
  };

  return (
    <>
      <Stack gap={2} direction="row" alignItems="center" justifyContent="flex-end">
        {billingInfo?.data?.address ? (
          <BlobProvider document={<InvoiceDocument invoice={row} billingInfo={billingInfo?.data} />}>
            {/* @ts-ignore */}
            {({ loading, url }) =>
              loading ? (
                "Loading preview..."
              ) : (
                <Button
                  sx={{ px: 0 }}
                  disableRipple
                  startIcon={<Icon name="Eye-On" />}
                  variant="text"
                  target="_blank"
                  href={url!}
                  rel="noopener noreferrer"
                >
                  Preview
                </Button>
              )
            }
          </BlobProvider>
        ) : (
          <Button
            sx={{ px: 0 }}
            disableRipple
            startIcon={<Icon name="Eye-On" />}
            onClick={handleSetupBillingAddress}
            variant="text"
          >
            Preview
          </Button>
        )}

        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="4" fill="#14162E" />
        </svg>

        {billingInfo?.data?.address ? (
          <Stack direction="row" gap={1}>
            <Icon name="download" />
            <PDFDownloadLink
              document={<InvoiceDocument invoice={row} billingInfo={billingInfo?.data} />}
              fileName={`invoice_${row.id}.pdf`}
              style={{ color: "white", textDecoration: "none" }}
            >
              {/* @ts-ignore */}
              {({ loading }) => (loading ? "Preparing document..." : "Download")}
            </PDFDownloadLink>
          </Stack>
        ) : (
          <Button
            sx={{ px: 0 }}
            disableRipple
            startIcon={<Icon name="download" />}
            onClick={handleSetupBillingAddress}
            variant="text"
          >
            Download
          </Button>
        )}
      </Stack>

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

const columns = [
  {
    title: "Invoice number",
    modify: (row: any) => row.id,
  },
  {
    title: "Invoice Date",
    modify: (row: any) => fDate(row.created_at, "dd.MM.yyyy HH:mm"),
  },
  {
    title: "",
    modify: (row: any) => <ActionButtons row={row} />,
  },
];

const BillingHistory: FC = () => {
  const { data } = useFinancialServiceFinancialPaymentsQuery();

  return (
    <CustomTable
      title="History"
      data={data?.data ?? []}
      columns={columns}
      emptyTitle="You have not any billing history yet"
      emptySubtitle="Track profits, losses and valuation all in one place."
    />
  );
};

export default BillingHistory;
