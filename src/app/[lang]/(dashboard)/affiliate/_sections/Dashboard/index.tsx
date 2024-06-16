"use client";

import { Icon } from "@/components/icons";
import ContentStack from "@app/_components/ContentStack";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useState, type FC } from "react";
import WithdrawDialog from "@app/_components/WithdrawDialog";
import RiveComp from "@/components/RiveComp";

const arr = [
  { title: "planktons", image: "/assets/rive/plankton.riv", amount: 48 },
  { title: "Shrimps", image: "/assets/rive/shrimp.riv", amount: 102 },
  { title: "Fishes", image: "/assets/rive/fish.riv", amount: 35 },
  { title: "Sharks", image: "/assets/rive/shark.riv", amount: 40 },
  { title: "whales", image: "/assets/rive/whale_animation.riv", amount: 16 },
];

const AFDashboardTab: FC = () => {
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);

  return (
    <Stack p={{ md: 4, xs: 3 }} pt={{ md: 3 }} gap={3}>
      <Stack direction={{ md: "row" }} gap={3}>
        <ContentStack direction="row" gap={2} flex={1} alignItems={{ md: "center" }}>
          <Stack p={2} bgcolor="dark.3" width={56} height={56} borderRadius="28px">
            <Icon name="Money--colorful" />
          </Stack>
          <Stack>
            <Typography variant="h4-semi-bold">€ 100,000,000.00</Typography>
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
              <Typography variant="h4-semi-bold">€ 8,000.00</Typography>
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
        <Stack p={3} flex={4 / 12} gap={2}>
          <Stack direction="row" justifyContent="space-between" bgcolor="blue.dark" borderRadius="10px" px={2} py={1}>
            <Typography variant="p1-regular">Current Rank</Typography>
            <Typography variant="p1-semi-bold">#Ranky88</Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" flex={1}>
              <Typography variant="h4-semi-bold">1.5 %</Typography>
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
                  40
                </Typography>
              </Stack>
              <Typography variant="p2-medium" color="grey.light">
                Gold Coins
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderWidth: "1px" }} />

        <Stack p={3} flex={4 / 12} alignItems={"center"} justifyContent={"center"} position={"relative"}>
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

          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="h1-bold">88</Typography>
            <Typography variant="h3-bold">%</Typography>
          </Stack>

          <Typography variant="p2-medium" textTransform={"uppercase"} color="grey.light">
            Progress
          </Typography>

          <Stack
            sx={{
              mt: 3,
              backdropFilter: "blur(12px)",
              bgcolor: "rgba(255, 255, 255, 0.04)",
              borderRadius: "2px",
              width: "100%",
              height: "4px",
            }}
          >
            <Stack
              sx={{
                position: "absolute",
                background: "linear-gradient(90deg, #00B171 0%, #FFF 100%)",
                borderRadius: "2px",
                height: "4px",
                width: "88%",
              }}
            />
          </Stack>
        </Stack>

        <Divider flexItem sx={{ borderWidth: "1px" }} />

        <Stack p={3} flex={4 / 12} gap={2}>
          <Stack direction="row" justifyContent="space-between" bgcolor="dark.3" borderRadius="10px" px={2} py={1}>
            <Typography variant="p1-regular">Current Rank</Typography>
            <Typography variant="p1-semi-bold" color="pink.dark">
              #Ranky88
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack alignItems="center" flex={1}>
              <Typography variant="h4-semi-bold" color="success.main">
                +2.5 %
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
                  +60
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
              <Typography variant="h4-semi-bold">404</Typography>
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
              <Typography variant="h4-semi-bold">€ 77,400.00</Typography>
              <Typography variant="p2-medium" color="grey.light">
                First line Volume
              </Typography>
            </Stack>
          </Stack>
        </ContentStack>

        <ContentStack flex={8 / 12} p={0} direction={"row"} flexWrap={{ md: "unset", xs: "wrap" }}>
          {arr.map((item, index) => (
            <Stack
              key={item.title}
              flex={1}
              py={3}
              px={{ md: 2, xs: 3 }}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={{ sm: !(index % 2) ? undefined : "dark.3" }}
            >
              <Box sx={{ aspectRatio: 1 }}>
                <RiveComp width={80} height={80} src={item.image} />
              </Box>
              <Typography mt={1} variant="h4-semi-bold">
                {item.amount}
              </Typography>
              <Typography variant="p2-medium" textTransform={"capitalize"} color="grey.light">
                {item.title}
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
