"use client";
import { useTranslate } from "@/locales";
import { fDate } from "@/utils/format-time";
import { Stack } from "@mui/material";
import numeral from "numeral";
import CardItem from "./CardItem";
import Summary from "./Summary";

const formatDate = (dateTime: any) => fDate(dateTime, "dd.MMM.yyyy");

type Props = {
  evaluation: string | undefined;
  rtl: string | undefined;
  risk_level: string | undefined;
  ds: string | undefined;
  potential_multiplier: string | undefined;
  target_price: string | undefined;
  potential_multiplier_end_date: string | undefined;
  potential_multiplier_start_date: string | undefined;
  target_price_date: string | undefined;
  report_summary: string | undefined;
  // recommended_percentage: number | undefined;
};

const Card = ({
  ds,
  // recommended_percentage,
  evaluation,
  potential_multiplier,
  risk_level,
  rtl,
  target_price,
  potential_multiplier_end_date,
  potential_multiplier_start_date,
  target_price_date,
  report_summary,
}: Props) => {
  const { t } = useTranslate();

  return (
    <Stack
      spacing={3}
      sx={{
        border: "1px solid",
        borderTop: 0,
        borderColor: "dark.3",
        overflow: "hidden",
        bgcolor: "dark.2",
        borderRadius: 2,
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={0.3}>
        <CardItem
          title={t("coinreportsingleview.evaluation")}
          value={numeral(evaluation).format("0,0.00")}
          subtitle={t("coinreportsingleview.basedonmarketreadings")}
        />
        <CardItem title={t("coinreportsingleview.rtl")} value={rtl} subtitle={risk_level} symbol="%" />
        <CardItem
          title={t("coinreportsingleview.ds")}
          value={ds}
          // subtitle={recommended_percentage}
          hasCaclulation
          symbol="%"
        />
        <CardItem
          title={t("coinreportsingleview.potentialMultiplier")}
          value={potential_multiplier}
          symbol="x"
          subtitle={`${formatDate(potential_multiplier_start_date)} - ${formatDate(potential_multiplier_end_date)}`}
        />
        <CardItem
          title={t("coinreportsingleview.targetPrice")}
          value={target_price}
          currency="$"
          subtitle={formatDate(target_price_date)}
        />
      </Stack>
      <Stack spacing={4} px={3} pb={3}>
        <Summary title={t("coinreportsingleview.reportSummary")} description={report_summary} />
        <Summary
          title={t("coinreportsingleview.briefonOurEvaluation")}
          description={t("coinreportsingleview.briefonOurEvaluationDescription")}
        />
      </Stack>
    </Stack>
  );
};

export default Card;
