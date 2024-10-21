import { TableCell, Stack, Typography } from "@mui/material";
import numeral from "numeral";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import type React from "react";

type TotalRowProps = {
  item: any;
  index: number;
  totals: Record<string, number>;
};

const TotalRow: React.FC<TotalRowProps> = ({ item, index, totals }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const field = item.field;
  const totalValue = totals[field];
  const colorFullFields = ["realized_pnl", "actual_value"];
  const color = colorFullFields.includes(field) ? (totalValue < 0 ? "error.main" : "success.main") : "white";

  if (field === "name") {
    return (
      <TableCell key={index}>
        <Stack width={"100%"} pl={1} pb={3}>
          <Typography variant="p2-medium" color={"grey.light"} textTransform={"uppercase"}>
            {isMobile ? t("assetsTable.total") : t("assetsTable.assetsTotalValue")}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  if (totalValue !== undefined) {
    return (
      <TableCell key={index}>
        <Stack width={"100%"} pb={3}>
          <Typography variant="p2-medium" color={color}>
            {numeral(totalValue).format("0,0.00")}
          </Typography>
        </Stack>
      </TableCell>
    );
  }

  return <TableCell key={index} />;
};

export default TotalRow;
