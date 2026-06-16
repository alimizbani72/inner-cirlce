import { useQuery } from "@tanstack/react-query";
import {
  getOverview,
  getOverviewHistory,
  getPortfolioById,
  getPortfolioHistoryById,
  getPortfolios,
} from "./api";

export const useGetPortfoliosId = (id?: string) => {
  return useQuery({
    queryKey: ["portfolio", id],
    queryFn: () => getPortfolioById(id!),
    enabled: !!id,
  });
};

export const useGetOverviewHistory = (enabled = true) => {
  return useQuery({
    queryKey: ["overview-history"],
    queryFn: getOverviewHistory,
    enabled,
  });
};

export const useGetPortfoliosIdHistory = (id?: string) => {
  return useQuery({
    queryKey: ["portfolio-history", id],
    queryFn: () => getPortfolioHistoryById(id!),
    enabled: !!id,
  });
};

export const useGetOverview = (enabled = true) => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: getOverview,
    enabled,
  });
};

export const useGetPortfolios = () => {
  return useQuery({
    queryKey: ["portfolios"],
    queryFn: getPortfolios,

    // 🔥 production-ready config
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};
