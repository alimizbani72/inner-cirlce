import { useTranslate } from '@/locales';
import type { PayoutHttpPayoutResponse } from '@/services/minecraft/minecraftAPI.schemas';
import { convertAndDownloadCSV } from '@/utils/convertAndDownloaCSV';
import { fDate } from '@/utils/format-time';
import { Button } from '@mui/material';
import { type FC, useState } from 'react';
import { toast } from 'sonner';
type DownloadPayoutButtonProps = {
  payoutData: PayoutHttpPayoutResponse[];
  fromDate: string;
  toDate: string;
  isDownloadDisabled: boolean;
  closeModal: VoidFunction;
  selectedFormat: 'CSV' | 'PDF';
};

const DownloadPayoutButton: FC<DownloadPayoutButtonProps> = ({
  payoutData,
  fromDate,
  toDate,
  isDownloadDisabled,
  closeModal,
  selectedFormat,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslate();

  const downloadPDF = async () => {
    try {
      const [{ pdf }, { default: PayoutDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('./PayoutDocument'),
      ]);

      const doc = <PayoutDocument payouts={payoutData} fromDate={fromDate} toDate={toDate} />;

      const blob = await pdf(doc).toBlob();

      // Create a URL and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `payout_${fDate(fromDate, 'DD.MM.YYYY')}_${fDate(toDate, 'DD.MM.YYYY')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      closeModal();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCSV = () => {
    try {
      const finalData = payoutData?.map((payout) => ({
        userId: payout?.user_id,
        walletId: payout?.wallet_id,
        amount: payout?.amount?.value,
        date: fDate(payout?.created_at, 'DD.MM.YYYY'),
        status: payout.status,
      })) as any;

      convertAndDownloadCSV(
        finalData,
        ['User ID', 'Wallet Id', 'Amount', 'Date', 'Status'],
        `payout_${fDate(fromDate, 'DD.MM.YYYY')}_${fDate(toDate, 'DD.MM.YYYY')}`
      );
      closeModal();
    } catch (error) {
      console.error('Error generating CSV:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!payoutData?.length) {
      toast.error(t('affPayoutsTab.noDataToDownload'));
      return;
    }
    setIsGenerating(true);
    if (selectedFormat === 'PDF') {
      downloadPDF();
    } else {
      downloadCSV();
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isDownloadDisabled}>
      {isGenerating ? 'Loading...' : 'Download'}
    </Button>
  );
};

export default DownloadPayoutButton;
