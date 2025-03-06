import { type FC, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '@/components/icon';
import type {
  BillingAddressHttpBillingAddressResponse,
  PaymentHttpPaymentItemResponse,
} from '@/services/minecraft/minecraftAPI.schemas';

const ViewInvoiceButton: FC<{
  invoice: PaymentHttpPaymentItemResponse;
  billingInfo: BillingAddressHttpBillingAddressResponse;
}> = ({ invoice, billingInfo }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePreview = async () => {
    setIsGenerating(true);

    try {
      const [{ pdf }, { default: InvoiceDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('../InvoiceDocument'),
      ]);

      const doc = <InvoiceDocument invoice={invoice} billingInfo={billingInfo} />;

      const blob = await pdf(doc).toBlob();

      // Create a URL and open in a new tab
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank', 'noopener,noreferrer');

      // Optionally revoke the object URL after some time
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 60000); // Revoke after 1 minute
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Stack
      direction="row"
      gap={0.5}
      alignItems="center"
      onClick={handlePreview}
      sx={{ cursor: 'pointer' }}
    >
      <Icon name={isGenerating ? 'LoadingIcon' : 'EyeOnIcon'} />
      <Typography variant="p2-medium"> {isGenerating ? 'Loading...' : 'Preview'}</Typography>
    </Stack>
  );
};

export default ViewInvoiceButton;
