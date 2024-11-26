import { plans } from "@/configs/plans";

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
    label: "24H",
    value: "1d",
  },
  {
    label: "7D",
    value: "7d",
  },
];

const planKeys = Object.keys(plans) as Array<keyof typeof plans>;
export const packageOptions = planKeys.map((plan) => ({
  label: plan,
  value: plan,
  img: plans[plan].image,
}));
