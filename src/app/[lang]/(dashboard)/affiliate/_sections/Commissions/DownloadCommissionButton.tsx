import { type FC, useState } from "react";
import { Button } from "@mui/material";
import { fDate } from "@/utils/format-time";
import { convertAndDownloadCSV } from "@/utils/convertAndDownloaCSV";
import { enqueueSnackbar } from "notistack";
import { useTranslate } from "@/locales";
type DownloadPayoutButtonProps = {
  commissions: any[];
  fromDate: string;
  toDate: string;
  isDownloadDisabled: boolean;
  closeModal: VoidFunction;
  selectedFormat: "PDF" | "CSV";
};

const DownloadCommissionButton: FC<DownloadPayoutButtonProps> = ({
  commissions,
  fromDate,
  toDate,
  isDownloadDisabled,
  closeModal,
  selectedFormat,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslate();

  const downloadCSV = () => {
    try {
      const finalData = commissions?.map((commission) => ({
        userId: commission?.user_id,
        email: commission?.email,
        amount: commission?.amount?.value,
        packageName: commission?.plan_type,
        percent: commission?.percent,
        date: fDate(commission?.created_at, "dd.MM.yyyy"),
      })) as any;

      convertAndDownloadCSV(
        finalData,
        [
          "User ID",
          "User Email",
          "Amount",
          "Package Name",
          "Percentage",
          "Commission Date",
        ],
        `commission_${fDate(fromDate, "dd.MM.yyyy")}_${fDate(
          toDate,
          "dd.MM.yyyy"
        )}`
      );
      closeModal();
    } catch (error) {
      console.error("Error generating CSV:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    try {
      const [{ pdf }, { default: CommissionDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./CommissionDocument"),
      ]);

      const doc = (
        <CommissionDocument
          commissions={commissions}
          fromDate={fromDate}
          toDate={toDate}
        />
      );

      const blob = await pdf(doc).toBlob();

      // Create a URL and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `commission_${fDate(fromDate, "dd.MM.yyyy")}_${fDate(
        toDate,
        "dd.MM.yyyy"
      )}.pdf`;
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

  const handleDownload = () => {
    if (!commissions?.length) {
      enqueueSnackbar(t("affCommissionsTab.noDataToDownload"), {
        variant: "error",
      });
      return;
    }
    setIsGenerating(true);
    if (selectedFormat === "PDF") {
      downloadPDF();
    } else {
      downloadCSV();
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloadDisabled}>
      {isGenerating ? "Loading..." : "Download"}
    </Button>
  );
};

export default DownloadCommissionButton;
