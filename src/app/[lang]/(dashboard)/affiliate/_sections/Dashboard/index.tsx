"use client";

import { Icon } from "@/components/icons";
import ContentStack from "@app/_components/ContentStack";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useMemo, useState, type FC } from "react";
import WithdrawDialog from "@app/_components/WithdrawDialog";
import RiveComp from "@/components/RiveComp";
import {
  useAffiliateServiceAffiliateBalanceQuery,
  useAffiliateServiceAffiliateChildrenQuery,
  useAffiliateServiceAffiliateMeQuery,
  useAffiliateServiceAffiliateProgressQuery,
  useAffiliateServiceAffiliateRanksQuery,
} from "@/services/queries";
import { formatCurrency, toNumber } from "@/utils/toNumber";
import { toPascalCase } from "@/utils/change-case";
import { plans } from "@/configs/plans";

const ProgressBar = ({ overall, percent }: { overall?: boolean; percent: number }) => (
  <Stack
    sx={{
      flex: 9 / 10,
      backdropFilter: "blur(12px)",
      bgcolor: "rgba(255, 255, 255, 0.04)",
      borderRadius: "2px",
      width: "100%",
      height: overall ? 8 : 4,
    }}
  >
    <Stack
      sx={{
        position: "absolute",
        background: overall
          ? "linear-gradient(90deg, #00B171 0%, #FFF 100%)"
          : "linear-gradient(90deg, #565CE4 0%, #FFF 100%)",
        borderRadius: "2px",
        height: overall ? 8 : 4,
        width: `${percent}%`,
      }}
    />
  </Stack>
);

const AFDashboardTab: FC = () => {
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const { data: me } = useAffiliateServiceAffiliateMeQuery();
  const { data: ranks } = useAffiliateServiceAffiliateRanksQuery();
  const { data: balance } = useAffiliateServiceAffiliateBalanceQuery();
  const { data: progress } = useAffiliateServiceAffiliateProgressQuery();
  const { data: children } = useAffiliateServiceAffiliateChildrenQuery();

  const nextRank = useMemo(() => {
    const findIndex = ranks?.data?.findIndex((item) => item.type === me?.data?.rank?.type) ?? -1;

    if (findIndex > -1) {
      return ranks?.data?.[findIndex + 1];
    }

    return me?.data?.rank;
  }, [me, ranks]);

  const overallProgressPercent = useMemo(
    () => Object.values(progress?.data || {}).reduce((total, { percent }) => total + toNumber(percent), 0),
    [progress?.data]
  );

  return (
    <Stack p={{ md: 4, xs: 3 }} pt={{ md: 3 }} gap={3}>
      <Stack direction={{ md: "row" }} gap={3}>
        <ContentStack direction="row" gap={2} flex={1} alignItems={{ md: "center" }}>
          <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
            <Icon name="Money--colorful" />
          </Stack>
          <Stack>
            <Typography variant="h4-semi-bold">{formatCurrency(me?.data?.turnover)}</Typography>
            <Typography variant="p2-medium" color="grey.light">
              Total Turnover
            </Typography>
          </Stack>
        </ContentStack>

        <ContentStack direction={{ md: "row" }} gap={3} flex={1} alignItems={{ md: "center" }}>
          <Stack direction="row" gap={2}>
            <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
              <Icon name="Money--colorful" />
            </Stack>
            <Stack>
              <Typography variant="h4-semi-bold">{formatCurrency(balance?.data!)}</Typography>
              <Typography variant="p2-medium" color="grey.light">
                Commission Wallet
              </Typography>
            </Stack>
          </Stack>
          <Button
            sx={{ ml: "auto", width: { md: "auto", xs: "100%" } }}
            color="secondary"
            onClick={() => setOpenWithdrawDialog(true)}
          >
            Withdraw
          </Button>
        </ContentStack>
      </Stack>

      <Stack
        borderRadius={2}
        border="1px solid"
        bgcolor="dark.2"
        borderColor="dark.3"
        direction={{ md: "row" }}
        overflow="hidden"
      >
        <Stack p={3} flex={4 / 12} gap={2} justifyContent={{ md: "center" }}>
          <Stack direction="row" justifyContent="space-between" bgcolor="blue.dark" borderRadius="10px" px={2} py={1}>
            <Typography variant="p1-regular">Current Rank</Typography>
            <Typography variant="p1-semi-bold">#{toPascalCase(me?.data?.rank?.type)}</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" flex={1}>
              <Typography variant="h4-semi-bold">{(me?.data?.rank as any)?.percent} %</Typography>
              <Typography variant="p2-medium" color="grey.light">
                Override Bonus
              </Typography>
            </Stack>
            <Divider flexItem sx={{ borderWidth: "1px" }} />
            <Stack alignItems="center" flex={1}>
              <Stack direction="row" alignItems="center" position={"relative"}>
                <Box position="absolute" left="-16px" sx={{ aspectRatio: 1 }}>
                  <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
                </Box>
                <Typography pl={4} variant="h4-semi-bold">
                  {toNumber(me?.data?.goldCoins)}
                </Typography>
              </Stack>
              <Typography variant="p2-medium" color="grey.light">
                Gold Coins
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderWidth: "1px" }} />

        <Stack p={3} flex={4 / 12} gap={1} position={"relative"}>
          <Box
            sx={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
              width: 144,
              height: 144,
              borderRadius: "144px",
              position: "absolute",
              left: { md: "50%", xs: "-100px" },
              transform: { md: "translateX(-50%)", xs: "translateY(-50%)" },
              top: { md: "-100px", xs: "50%" },
              filter: "blur(100px)",
            }}
          />

          <Box
            sx={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
              width: 144,
              height: 144,
              borderRadius: "144px",
              position: "absolute",
              left: { md: "50%" },
              right: { md: "unset", xs: "-100px" },
              transform: { md: "translateX(-50%)", xs: "translateY(-50%)" },
              bottom: { md: "-100px" },
              top: { md: "unset", xs: "50%" },
              filter: "blur(100px)",
            }}
          />

          <Stack height={24} direction="row" alignItems={"center"} justifyContent="space-between" width={"100%"}>
            <Stack width={94} direction={"row"} alignItems="center">
              <Typography variant="caption-medium" mr={1} color="grey.light">
                First:
              </Typography>
              <Typography variant="p2-semi-bold">{toNumber(progress?.data?.first_line?.percent)}</Typography>
              <Typography variant="caption-semi-bold" ml="2px">
                %
              </Typography>
            </Stack>

            <ProgressBar percent={toNumber(progress?.data?.first_line?.percent)} />
          </Stack>

          <Stack height={24} direction="row" alignItems={"center"} justifyContent="space-between" width={"100%"}>
            <Stack width={94} direction={"row"} alignItems="center">
              <Typography variant="caption-medium" mr={1} color="grey.light">
                Second:
              </Typography>
              <Typography variant="p2-semi-bold">{toNumber(progress?.data?.second_line?.percent)}</Typography>
              <Typography variant="caption-semi-bold" ml="2px">
                %
              </Typography>
            </Stack>

            <ProgressBar percent={toNumber(progress?.data?.second_line?.percent)} />
          </Stack>

          <Stack height={24} direction="row" alignItems={"center"} justifyContent="space-between" width={"100%"}>
            <Stack width={94} direction={"row"} alignItems="center">
              <Typography variant="caption-medium" mr={1} color="grey.light">
                Third:
              </Typography>
              <Typography variant="p2-semi-bold">{toNumber(progress?.data?.third_line?.percent)}</Typography>
              <Typography variant="caption-semi-bold" ml="2px">
                %
              </Typography>
            </Stack>

            <ProgressBar percent={toNumber(progress?.data?.third_line?.percent)} />
          </Stack>

          <Stack height={24} direction="row" alignItems={"center"} justifyContent="space-between" width={"100%"}>
            <Stack width={94} direction={"row"} alignItems="center">
              <Typography variant="caption-medium" mr={1} color="grey.light">
                Other:
              </Typography>
              <Typography variant="p2-semi-bold">{toNumber(progress?.data?.other_lines?.percent)}</Typography>
              <Typography variant="caption-semi-bold" ml="2px">
                %
              </Typography>
            </Stack>

            <ProgressBar percent={toNumber(progress?.data?.other_lines?.percent)} />
          </Stack>

          <Stack height={24} direction="row" alignItems={"center"} justifyContent="space-between" width={"100%"}>
            <Stack width={94} direction={"row"} alignItems="center">
              <Typography variant="caption-medium" mr={1} color="grey.light">
                Overall:
              </Typography>
              <Typography variant="h4-bold">{overallProgressPercent}</Typography>
              <Typography variant="caption-semi-bold" ml="2px">
                %
              </Typography>
            </Stack>

            <ProgressBar overall percent={overallProgressPercent} />
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderWidth: "1px" }} />

        <Stack p={3} flex={4 / 12} gap={2} justifyContent={{ md: "center" }}>
          <Stack direction="row" justifyContent="space-between" bgcolor="dark.3" borderRadius="10px" px={2} py={1}>
            <Typography variant="p1-regular">Next Rank</Typography>
            <Typography variant="p1-semi-bold" color="pink.dark">
              #{toPascalCase(nextRank?.type)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" flex={1}>
              <Typography variant="h4-semi-bold" color="success.main">
                +{(nextRank as any)?.percent} %
              </Typography>
              <Typography variant="p2-medium" color="grey.light">
                Override Bonus
              </Typography>
            </Stack>
            <Divider flexItem sx={{ borderWidth: "1px" }} />
            <Stack alignItems="center" flex={1}>
              <Stack direction="row" alignItems="center" position={"relative"}>
                <Box position="absolute" left="-16px">
                  <RiveComp src="/assets/rive/coin_rotation_2.riv" width={60} height={60} />
                </Box>
                <Typography pl={4} variant="h4-semi-bold" color="success.main">
                  +{toNumber(nextRank?.gold_coins)}
                </Typography>
              </Stack>
              <Typography variant="p2-medium" color="grey.light">
                Gold Coins
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction={{ md: "row" }} gap={3}>
        <ContentStack flex={4 / 12} p={0}>
          <Stack p={3} direction="row" gap={2} flex={1} alignItems={{ md: "center" }}>
            <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
              <Icon name="User--colorful" />
            </Stack>
            <Stack>
              <Typography variant="h4-semi-bold">{children?.data?.total_count}</Typography>
              <Typography variant="p2-medium" color="grey.light">
                Team Members
              </Typography>
            </Stack>
          </Stack>
          <Divider flexItem sx={{ borderWidth: "1px" }} />
          <Stack p={3} direction="row" gap={2} flex={1} alignItems={{ md: "center" }}>
            <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
              <Icon name="Money--colorful" />
            </Stack>
            <Stack>
              <Typography variant="h4-semi-bold">{formatCurrency(children?.data?.first_line_turnover)}</Typography>
              <Typography variant="p2-medium" color="grey.light">
                First line Volume
              </Typography>
            </Stack>
          </Stack>
        </ContentStack>

        <ContentStack flex={8 / 12} p={0} direction={"row"} flexWrap={{ md: "unset", xs: "wrap" }}>
          {children?.data?.distribution_of_plans?.map((item, index) => (
            <Stack
              key={item.plan_type}
              flex={1}
              py={3}
              px={{ md: 2, xs: 3 }}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={{ sm: !(index % 2) ? undefined : "dark.3" }}
            >
              <Box sx={{ aspectRatio: 1 }}>
                <RiveComp width={80} height={80} src={(plans as any)[item.plan_type!]?.rive} />
              </Box>
              <Typography mt={1} variant="h4-semi-bold">
                {item.count}
              </Typography>
              <Typography variant="p2-medium" textTransform={"capitalize"} color="grey.light">
                {item.plan_type}
              </Typography>
            </Stack>
          ))}
        </ContentStack>
      </Stack>

      <WithdrawDialog open={openWithdrawDialog} close={() => setOpenWithdrawDialog(false)} />
    </Stack>
  );
};

export default AFDashboardTab;
