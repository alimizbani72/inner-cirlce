"use client";

import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { Box, Stack, Typography } from "@mui/material";
import Entry from "./Entry";
import Image from "@/components/Image";
type Props = {
  logo: string | undefined;
  name: string | undefined;
  symbol: string | undefined;
  plan_type: string;
  ee_signal: string | undefined;
};
const Header = ({ logo, name, symbol, plan_type, ee_signal }: Props) => {
  return (
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
        <Icon name="Star-grey" />
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Image src={logo} alt={name} width={32} height={32} />
          <Typography variant="p2-regular" textTransform={"capitalize"}>
            {name}
          </Typography>
          <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "dark.3" }} />
          <Typography variant="p2-regular" color={"grey.light"} textTransform={"uppercase"}>
            {symbol}
          </Typography>
        </Stack>
        <Box sx={{ width: "4px", height: "4px", borderRadius: "50%", bgcolor: "dark.3" }} />
        <Image src={plans[plan_type as keyof typeof plans]?.image} width={32} height={32} />
      </Stack>
      <Stack direction={"row"} spacing={{ xs: 3, md: 2 }} flexWrap={"wrap"}>
        <Entry signal={ee_signal} />
        {/* Needs API  */}
        {/* <ButtonAction /> */}
      </Stack>
    </Stack>
  );
};

export default Header;
