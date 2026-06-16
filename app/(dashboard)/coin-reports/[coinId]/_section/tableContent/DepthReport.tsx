import { useTranslate } from "@/locales";
import { snipText } from "@/utils/string";
import { Stack, Typography } from "@mui/material";

type ReportSection = {
  title: string;
  description: string;
};

type DepthReportProps = {
  sections: ReportSection | undefined;
};

const DepthReport = ({ sections }: DepthReportProps) => {
  const { t } = useTranslate();

  if (!sections) {
    return null;
  }

  return (
    <Stack
      p={3}
      sx={{
        bgcolor: "dark.2",
        border: "1px solid",
        borderColor: "dark.3",
        borderRadius: 2,
      }}
      spacing={3}
    >
      <Typography variant="h4-semi-bold">
        {t("coinReportSingleView.inDepthReport")}
      </Typography>

      <Stack spacing={5}>
        <Stack spacing={1} mb={3}>
          <Typography variant="p1-semi-bold">{sections.title}</Typography>

          <Typography
            variant="p2-regular"
            color={"grey.light"}
            sx={{ ...snipText(100) }}
          >
            {sections.description}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DepthReport;
