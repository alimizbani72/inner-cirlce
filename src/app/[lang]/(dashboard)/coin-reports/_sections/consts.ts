import { plans } from "@/configs/plans";
import type { FilterFormDataType } from "@dashboard/coin-reports/_sections/types";

export const signalsList = [
  {
    value: "very_strong_buy",
    color: "#04AEAE",
    label: "Very Strong Buy",
  },
  {
    value: "strong_buy",
    color: "#03B375",
    label: "Strong Buy",
  },
  {
    value: "buy",
    color: "#79B303",
    label: "Buy",
  },
  {
    value: "neutral",
    color: "#DFAB00",
    label: "Neutral",
  },
  {
    value: "sell",
    color: "#E98A17",
    label: "Sell",
  },
  {
    value: "strong_sell",
    color: "#F96110",
    label: "Strong Sell",
  },
  {
    value: "very_strong_sell",
    color: "#FF3D3D",
    label: "Very Strong Sell",
  },
];

export enum signalColor {
  very_strong_buy = "#04AEAE",
  strong_buy = "#03B375",
  buy = "#79B303",
  neutral = "#DFAB00",
  sell = "#E98A17",
  strong_sell = "#F96110",
  very_strong_sell = "#FF3D3D",
}

export enum riskLevelColor {
  High = "#FF5757",
  Mid = "#F4A305",
  Low = "#00B171",
}

export const defaultValueSort = { newly_added: true };

export const SortOptions = [
  { value: "newly_added", label: "Newly Added" },
  { value: "name", label: "Name" },
  { value: "category", label: "Category" },
];

export const timeFrameOptions = [
  {
    label: "1H",
    value: "1h",
  },
  {
    label: "1D",
    value: "1d",
  },
  {
    label: "1W",
    value: "1w",
  },
];

const planKeys = Object.keys(plans) as Array<keyof typeof plans>;
export const packageOptions = planKeys.map((plan) => ({
  label: plan,
  value: plan,
  img: plans[plan].image,
}));

export const TOTAL_SECONDS = 3600;

export const defaultValuesFilters: FilterFormDataType = {
  timeFrame: "1h",
  sorts: defaultValueSort,
  page: 1,
  per_page: 100,
};
