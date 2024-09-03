import { Box, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@/components/icons";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-responsive";
import { CustomMenuItem, CustomSelect } from "@app/_components/CustomSelect";
import { toTitleCase } from "@/utils/change-case";
import { useAppRouter } from "@/routes/hooks";

type Props = { tabs: { icon: string; link: string }[] };

const SectionSelect = ({ tabs }: Props) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { replace } = useAppRouter();
  const [tab, setTab] = useState(pathname.split("/settings/")?.[1]?.split("/")?.[0] ?? tabs?.[0]?.link);
  const handleChange = (event: any) => {
    setTab(event.target.value);
    replace(`/settings/${event.target.value}`);
  };

  return (
    <CustomSelect
      value={tab}
      onChange={handleChange}
      renderValue={(selected: any) => {
        const selectedTab = tabs.find((t) => t.link === selected)!;

        return (
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            <Icon name={`${selectedTab.icon}${tab === selectedTab.link ? "--colorful" : ""}` as any} />
            <Typography variant="p2-medium" color={tab === selectedTab.link ? "white" : "grey.light"}>
              {toTitleCase(selectedTab.link)}
            </Typography>
          </Stack>
        );
      }}
      sx={{ border: "1.5px solid", borderColor: "dark.3", width: isMobile ? "100%" : "164px" }}
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
      {tabs.map((t, index) => (
        <CustomMenuItem value={t.link} key={t.link}>
          <Stack width={1}>
            <Stack
              direction={"row"}
              gap={1}
              alignItems={"center"}
              sx={{ width: "100%", p: 1, ...(tab !== t.link && { "svg path": { stroke: "rgb(151, 153, 180)" } }) }}
            >
              <Icon name={`${t.icon}${tab === t.link ? "--colorful" : ""}` as any} />
              <Typography variant="p2-medium" color={tab === t.link ? "white" : "grey.light"}>
                {toTitleCase(t.link)}
              </Typography>

              {tab === t.link && (
                <Box sx={{ ml: "auto", path: { stroke: (theme) => theme.palette.pink.dark } }}>
                  <Icon name="Check" />
                </Box>
              )}
            </Stack>
            {index + 1 !== tabs.length && <Divider flexItem />}
          </Stack>
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
};

export default SectionSelect;
