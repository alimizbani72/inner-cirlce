"use client";
import { Stack } from "@mui/material";
import numeral from "numeral";
import CardItem from "./CardItem";
import Summary from "./Summary";
import { useTranslate } from "@/locales";
import { fDate } from "@/utils/format-time";

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
          subtitle="Based on market readings"
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
          symbol="X"
          subtitle={`${formatDate(potential_multiplier_start_date)} - ${formatDate(potential_multiplier_end_date)}`}
        />
        <CardItem
          title={t("coinreportsingleview.targetPrice")}
          value={target_price}
          subtitle={formatDate(target_price_date)}
          symbol="X"
        />
      </Stack>
      <Stack spacing={4} px={3} pb={3}>
        <Summary
          title="Report Summary"
          description="Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
           Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Sed vulputate mi sit amet mauris commodo quis imperdiet.
            Nisl tincidunt eget nullam non. Nibh sed pulvinar proin gravida hendrerit lectus a. Sociis natoque penatibus et magnis dis.
             Pulvinar mattis nunc sed blandit libero volutpat sed cras. Purus semper eget duis at tellus at urna condimentum mattis. 
             Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. 
             Neque gravida in fermentum et sollicitudin ac. Sit amet mattis vulputate enim nulla aliquet. Scelerisque varius morbi enim nunc faucibus a pellentesque sit amet.
              Ipsum a arcu cursus vitae congue mauris rhoncus aenean vel."
        />
        <Summary
          title="Brief on Our Evaluation"
          description="We conducted a thorough evaluation based on the available data.  While we endeavoured for comprehensive analysis,
           the data volume influenced our conclusions. For a detailed insight into our methodology and findings, please click here"
        />
      </Stack>
    </Stack>
  );
};

export default Card;
