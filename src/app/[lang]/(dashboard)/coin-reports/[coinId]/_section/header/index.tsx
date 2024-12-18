"use client";

import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { useFavoriteToggle } from "@/hooks/useFavoriteToggle";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import Entry from "./Entry";
type Props = {
  logo: string | undefined;
  name: string | undefined;
  symbol: string | undefined;
  plan_type: string;
  ee_signal: string | undefined;
  isFavorite: boolean;
};
const Header = ({ logo, name, symbol, plan_type, ee_signal, isFavorite: favStatus }: Props) => {
  const { coinId: slug } = useParams();
  const { isFavorite, toggleFavorite } = useFavoriteToggle(favStatus, slug as string);

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
        <IconButton onClick={toggleFavorite}>
          <Icon name={isFavorite ? "Star-color--full" : "Star-grey"} />
        </IconButton>
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
