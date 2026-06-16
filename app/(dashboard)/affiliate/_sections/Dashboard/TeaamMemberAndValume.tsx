"use client";
import Icon from "@/components/icon";
import { useTranslate } from "@/locales";
import { formatCurrency } from "@/utils/toNumber";
import ContentStack from "@app-components/ContentStack";
import { Divider, Stack, Typography } from "@mui/material";

const TeamMemberAndVolume = () => {
  const { t } = useTranslate();
  const children = {
    data: {
      total_count: 24,
      first_line_turnover: { value: 12500, currency_code: "USD" },
    },
  };

  const isLoading = false;
  return (
    <ContentStack
      p={0}
      width={{ md: "33.33%" }}
      minWidth={243}
      className={isLoading ? "loading-skeleton" : ""}
      height={"212px"}
    >
      {children?.data && (
        <Stack>
          <Stack
            p={3}
            direction="row"
            gap={2}
            flex={1}
            alignItems={{ md: "center" }}
          >
            <Stack
              p={2}
              bgcolor="dark.3"
              width={56}
              height={56}
              borderRadius="28px"
            >
              <Icon name="UserfillIcon" />
            </Stack>
            <Stack>
              <Typography variant="h4-semi-bold">
                {children?.data?.total_count}
              </Typography>
              <Typography variant="p2-medium" color="grey.light">
                {t("afDashboardTab.teamMembers")}
              </Typography>
            </Stack>
          </Stack>
          <Divider flexItem sx={{ borderWidth: "1px" }} />
          <Stack
            p={3}
            direction="row"
            gap={2}
            flex={1}
            alignItems={{ md: "center" }}
          >
            <Stack
              p={2}
              bgcolor="dark.3"
              width={56}
              height={56}
              borderRadius="28px"
            >
              <Icon name="MoneyfillIcon" />
            </Stack>
            <Stack>
              <Typography variant="h4-semi-bold">
                {formatCurrency(children?.data?.first_line_turnover)}
              </Typography>
              <Typography variant="p2-medium" color="grey.light">
                {t("afDashboardTab.firstLineVolume")}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      )}
    </ContentStack>
  );
};

export default TeamMemberAndVolume;
