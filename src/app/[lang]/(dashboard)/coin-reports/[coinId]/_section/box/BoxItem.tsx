import { useIsMobile } from "@/hooks/use-responsive";
import { Stack, Typography } from "@mui/material";
import numeral from "numeral";
import type { FC } from "react";

type RevenueBoxProps = {
  title: string;
  value: any;
  hasrightBorder?: boolean;
  hasTopBorder?: boolean;
  symbol?: string;
  width?: string;
  hascurrency?: boolean;
};

const BoxItems: FC<RevenueBoxProps> = ({
  title,
  value,
  hasrightBorder,
  symbol,
  hasTopBorder,
  hascurrency,
  width = "25%",
}) => {
  const isMobile = useIsMobile();
  return (
    <Stack
      direction={"column"}
      sx={{
        width: width,
        borderRight: !isMobile && hasrightBorder ? "1px solid " : "none",
        borderTop: !isMobile && hasTopBorder ? "1px solid " : "none",
        borderColor: "dark.3",
        p: 3,
        bgcolor: "dark.2",
      }}
    >
      <Typography variant="p2-medium" whiteSpace={"pre"}>
        {hascurrency && "$"}
        {value > 1 ? numeral(value).format("0,0.00") : value}{" "}
        {!!symbol && (
          <Typography variant="p2-medium" textTransform={"uppercase"}>
            {symbol}
          </Typography>
        )}
      </Typography>

      <Typography variant="caption-medium" color={"grey.light"} whiteSpace={"pre"}>
        {title}
      </Typography>
    </Stack>
  );
};

export default BoxItems;
