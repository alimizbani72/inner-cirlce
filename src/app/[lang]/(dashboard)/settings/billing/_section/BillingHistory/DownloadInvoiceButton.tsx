import { type FC, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";

const DownloadInvoiceButton: FC<{ invoice: any; billingInfo: any }> = ({ invoice, billingInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const [{ pdf }, { default: InvoiceDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("../InvoiceDocument"),
      ]);

      const doc = <InvoiceDocument invoice={invoice} billingInfo={billingInfo} />;

      const blob = await pdf(doc).toBlob();

      // Create a URL and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice_${invoice.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Stack direction="row" gap={0.5} alignItems="center" onClick={handleDownload} sx={{ cursor: "pointer" }}>
      <Icon name={isGenerating ? "Loading" : "download"} />
      <Typography variant="p2-medium"> {isGenerating ? "Loading..." : "Download"}</Typography>
    </Stack>
  );
};

export default DownloadInvoiceButton;
