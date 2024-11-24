"use client";

import { Icon } from "@/components/icons";
import RiveComp from "@/components/RiveComp";
import { plans } from "@/configs/plans";
import { Box, Stack, Typography } from "@mui/material";
import Entry from "./Entry";
import Image from "@/components/Image";
type Props = {
  logo: string | undefined;
  name: string | undefined;
  symbol: string | undefined;
  plan_type: string;
  needsUpgrade: boolean;
  ee_signal: string | undefined;
};
const Header = ({ logo, name, symbol, plan_type, needsUpgrade, ee_signal }: Props) => {
  return (
    <>
      <Stack
        sx={{ borderRadius: 2, border: "1.5px solid", borderColor: "dark.3", p: 3, bgcolor: "dark.2" }}
        direction={"row"}
        flexWrap={"wrap"}
        alignItems={"center"}
        spacing={2}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {!needsUpgrade && <Icon name="Star-grey" />}
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {needsUpgrade ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    background:
                      "var(--Gradients-Gradient-Sky, radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%))",
                    borderRadius: "50%",
                    path: { stroke: (theme) => theme.palette.dark[1] },
                  }}
                >
                  <Icon name="Question" />
                </Box>
                <Typography variant="p2-medium" pb={1}>
                  ........
                </Typography>
              </>
            ) : (
              <>
                <Image src={logo} alt={name} width={32} height={32} />
                <Typography variant="p2-regular" textTransform={"capitalize"}>
                  {name}
                </Typography>
              </>
            )}
            <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "dark.3" }} />
            {needsUpgrade ? (
              <Typography variant="p2-medium" pb={1}>
                ........
              </Typography>
            ) : (
              <Typography variant="p2-regular" color={"grey.light"} textTransform={"uppercase"}>
                {symbol}
              </Typography>
            )}
          </Stack>

          <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "dark.3" }} />
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            {plan_type && (
              <Box sx={{ aspectRatio: 1 }}>
                <RiveComp src={plans[plan_type as keyof typeof plans]?.rive} width={32} height={32} />
              </Box>
            )}

            {needsUpgrade && <Icon name="lock" size={20} />}
          </Stack>
        </Stack>
        <Stack direction={"row"} spacing={{ xs: 3, md: 2 }} flexWrap={"wrap"}>
          <Entry signal={ee_signal} />
          {/* Needs API  */}
          {/* <ButtonAction /> */}
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
