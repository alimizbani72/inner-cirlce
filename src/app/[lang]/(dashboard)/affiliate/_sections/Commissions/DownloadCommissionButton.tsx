import { type FC, useState } from "react";
import { Button } from "@mui/material";
type DownloadPayoutButtonProps = {
  commissions: any[];
  fromDate: string;
  toDate: string;
  isDownloadDisabled: boolean;
  closeModal: VoidFunction;
};

const DownloadCommissionButton: FC<DownloadPayoutButtonProps> = ({
  commissions,
  fromDate,
  toDate,
  isDownloadDisabled,
  closeModal,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);

    try {
      const [{ pdf }, { default: CommissionDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./CommissionDocument"),
      ]);

      const doc = <CommissionDocument commissions={commissions} fromDate={fromDate} toDate={toDate} />;

      const blob = await pdf(doc).toBlob();

      // Create a URL and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `commission_${new Date().toISOString()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      closeModal();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloadDisabled}>
      {isGenerating ? "Loading..." : "Download"}
    </Button>
  );
};

export default DownloadCommissionButton;
