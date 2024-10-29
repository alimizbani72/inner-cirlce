import { BulletIcon, BulletIconActive } from "@app/_components/sidebar/Menu/Bullets";
import { Avatar, Stack, Typography } from "@mui/material";
import numeral from "numeral";

type TabsItemProps = {
  id?: string | undefined;
  portfolioName: string | undefined;
  portfolioAvatar: string | undefined;
  bgColor: string | undefined;
  isActive: boolean;
  price: string;
  onClick: () => void;
};
const TabsItem = ({ portfolioAvatar, portfolioName, bgColor, onClick, isActive, price }: TabsItemProps) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      onClick={onClick}
      justifyContent={"space-between"}
      sx={{
        cursor: "pointer",
        border: "1px solid",
        borderRadius: 4,
        bgcolor: isActive ? "dark.3" : "dark.1",
        p: 1,
        minWidth: "248px",
        borderColor: "dark.3",
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <Avatar sx={{ width: 48, height: 48, bgcolor: bgColor }}>{portfolioAvatar}</Avatar>
        <Stack spacing={0.5}>
          <Typography variant="p2-medium" whiteSpace={"nowrap"}>
            {portfolioName}
          </Typography>
          <Typography variant="caption-medium" color={"grey.light"}>
            ${numeral(price).format("0,0.00")}
          </Typography>
        </Stack>
      </Stack>
      {isActive ? <BulletIconActive /> : <BulletIcon />}
    </Stack>
  );
};

export default TabsItem;
