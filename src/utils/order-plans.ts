import { plans } from "@/configs/plans";

export const orderArrayPlan = (data?: Array<{ [k: string]: any }>) =>
  data?.sort(
    (a, b) => plans?.[a?.plan_type as keyof typeof plans]?.order - plans?.[b?.plan_type as keyof typeof plans]?.order
  );
