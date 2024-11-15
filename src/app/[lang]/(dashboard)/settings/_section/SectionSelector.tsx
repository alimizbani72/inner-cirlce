import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { useAppRouter } from "@/routes/hooks";
import { getLastSegment } from "@/utils/string";
import { CustomMenuItem, CustomSelect } from "@app/_components/CustomSelect";
import { Stack, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import Mobiletabs from "./MobileTabs";

type Props = { tabs: { link: string; icon: string; title: string }[] };

const tabsObject = {
  account: { icon: "User", title: "settingTabs.account" },
  "become-partner": { icon: "Hand", title: "settingTabs.become-partner" },
  billing: { icon: "Money", title: "settingTabs.billing" },
  "business-account": { icon: "Star", title: "settingTabs.business-account" },
};

const SectionSelect = ({ tabs }: Props) => {
  const { t } = useTranslate();
  const pathname = usePathname();
  const { push } = useAppRouter();
  const handleChange = (event: any) => {
    push(`/settings/${event.target.value}`);
  };
  return (
    <CustomSelect
      value={getLastSegment(pathname)}
      onChange={handleChange}
      sx={{ border: "1.5px solid", borderColor: "dark.3", width: "100%" }}
      renderValue={(selected) => {
        return (
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Icon name={`${tabsObject[selected as keyof typeof tabsObject]?.icon}--colorful` as any} />
            <Typography variant="p2-medium" color={"white"}>
              {tabsObject[selected as keyof typeof tabsObject]?.title
                ? t(tabsObject[selected as keyof typeof tabsObject]?.title as any)
                : ""}
            </Typography>
          </Stack>
        );
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            boxShadow: "none",
            backgroundColor: "dark.2",
            color: "#fff",
            border: "1.5px solid",
            borderColor: "dark.3",
            mt: 1,
          },
        },
      }}
    >
      {tabs.map((tab, index) => (
        <CustomMenuItem key={tab.link} value={tab.link}>
          <Mobiletabs
            href={tab.link}
            icon={tab.icon}
            isLastOne={index + 1 !== tabs.length}
            title={t(tab.title as any)}
          />
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
};

export default SectionSelect;
