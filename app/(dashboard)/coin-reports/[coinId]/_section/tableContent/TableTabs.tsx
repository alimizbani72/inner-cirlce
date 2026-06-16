import { useTranslate } from "@/locales";
import { Divider, Stack, Typography } from "@mui/material";
import type { ReportSingleCoinReports } from ".";
import type { SelectedTabKey } from "./types";

type TableTabsProps = {
  contentData: ReportSingleCoinReports | undefined;
  selectedTab: SelectedTabKey;
  onSelect: (key: SelectedTabKey) => void;
};

const TableTabs = ({ contentData, selectedTab, onSelect }: TableTabsProps) => {
  const { t } = useTranslate();

  const keys = contentData
    ? (Object.keys(contentData) as SelectedTabKey[])
    : [];

  return (
    <Stack
      p={3}
      sx={{
        bgcolor: "dark.2",
        border: "1px solid",
        borderRadius: 2,
        borderColor: "dark.3",
      }}
      spacing={3}
    >
      <Typography variant="h4-semi-bold">
        {t("coinReportSingleView.tableOfContent")}
      </Typography>

      <Stack spacing={2}>
        {keys.map((key, index) => (
          <Stack key={key as any} spacing={2} sx={{ cursor: "pointer" }}>
            <Typography
              onClick={() => onSelect(key)}
              variant="p2-semi-bold"
              sx={{
                color: selectedTab === key ? "primary.light" : "grey.light",
              }}
            >
              {contentData?.[key].title}
            </Typography>

            {index < keys.length - 1 && <Divider />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default TableTabs;
