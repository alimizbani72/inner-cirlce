import { useTranslate } from '@/locales';
import type { ReportReportData } from '@/services/minecraft/minecraftAPI.schemas';
import { snipText } from '@/utils/string';
import { Stack, Typography } from '@mui/material';

type DepthReportProps = {
  sections: ReportReportData | undefined;
};

const DepthReport = ({ sections }: DepthReportProps) => {
  const { t } = useTranslate();
  return (
    <Stack
      p={3}
      sx={{ bgcolor: 'dark.2', border: '1px solid', borderColor: 'dark.3', borderRadius: 2 }}
      spacing={3}
    >
      <Typography variant="h4-semi-bold">{t('coinReportSingleView.inDepthReport')}</Typography>
      <Stack spacing={5}>
        <Stack spacing={1} mb={3}>
          <Typography variant="p1-semi-bold">{sections?.title}</Typography>
          <Typography variant="p2-regular" color={'grey.light'} sx={{ ...snipText(100) }}>
            {sections?.description}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DepthReport;
