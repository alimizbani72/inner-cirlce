import { Icon } from "@/components/icons";
import type { iconsType } from "@/components/icons/iconsNames";
import { Box, Stack, Typography } from "@mui/material";
const getRecommendation = (ds: any) => {
  let status;
  let color;
  let icon;

  if (ds >= 75) {
    status = "Recommended";
    color = "success";
    icon = "Arrow-up";
  } else if (ds >= 40) {
    status = "Caution";
    color = "warning";
    icon = "Warning";
  } else {
    status = "Not Recommended";
    color = "error";
    icon = "Arrow-down";
  }
  return { status, color, icon, percentage: ds };
};

type Props = {
  title: string;
  value: any;
  hasCaclulation?: boolean;
  subtitle?: string;
  symbol?: string;
};

const CardItem = ({ title, value, hasCaclulation, subtitle, symbol }: Props) => {
  const { status, color, icon, percentage } = getRecommendation(value);
  return (
    <Stack
      sx={{ p: 3, bgcolor: "dark.3", width: "100%", height: { xs: "160px", md: "192px" } }}
      justifyContent={"space-between"}
    >
      <Stack>
        <Typography variant="p2-medium" color={"grey.light"}>
          {title}
        </Typography>
        <Typography variant="h3-bold">
          {value}
          {symbol && symbol}
        </Typography>
      </Stack>
      {hasCaclulation ? (
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="p2-regular" color="grey.light" mr={"auto"}>
            {status}
          </Typography>
          <Box sx={{ path: { stroke: (theme) => (theme.palette as any)[color].main } }}>
            <Icon name={icon as iconsType} />
          </Box>
          <Typography variant="p2-semi-bold" color={(theme) => (theme.palette as any)[color].main}>
            {percentage}%
          </Typography>
        </Stack>
      ) : (
        <Typography variant="p2-regular" color="grey.light">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default CardItem;
