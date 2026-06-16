import {
  mockHistory,
  mockPortfolio,
  mockPortfolioDetail,
  mockPortfolios,
} from "./mock";
import type {
  PortfolioHistoryResponse,
  PortfolioResponse,
  PortfoliosResponse,
} from "./typess";

// simulate API delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const getPortfolios = async (): Promise<PortfoliosResponse> => {
  await delay(400);
  return mockPortfolios;
};
export const getOverview = async (): Promise<PortfolioResponse> => {
  await delay(500);
  return mockPortfolio;
};

export const getPortfolioById = async (
  id: string,
): Promise<PortfolioResponse> => {
  await delay(500);
  return {
    ...mockPortfolioDetail,
    data: { ...mockPortfolioDetail.data, id },
  };
};

export const getOverviewHistory =
  async (): Promise<PortfolioHistoryResponse> => {
    await delay(500);
    return mockHistory;
  };

export const getPortfolioHistoryById = async (
  _id: string,
): Promise<PortfolioHistoryResponse> => {
  await delay(500);
  return mockHistory;
};
