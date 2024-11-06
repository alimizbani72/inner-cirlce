import { useTranslate } from "@/locales";
import { Stack, Typography } from "@mui/material";
type Section = {
  title: string;
  description: string;
};

type DepthReportProps = {
  sections: Section[];
};
const DepthReport = ({ sections }: DepthReportProps) => {
  const { t } = useTranslate();
  return (
    <Stack p={3} sx={{ bgcolor: "dark.2", border: "1px solid", borderColor: "dark.3", borderRadius: 2 }} spacing={3}>
      <Typography variant="h4-semi-bold">{t("coinreportsingleview.inDepthReport")}</Typography>
      <Stack spacing={5}>
        {sections.map((section, index) => (
          <Stack key={index} spacing={1} mb={3}>
            <Typography variant="p1-semi-bold">{section.title}</Typography>
            <Typography variant="p2-regular" color={"grey.light"}>
              {section.description}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default DepthReport;
