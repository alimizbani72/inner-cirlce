"use client";
import { Stack } from "@mui/material";
import TabsItem from "./TabsItem";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectSelectedPortfolioId, setSelectedPortfolioId } from "@/lib/features/portfolio/portfolioSlice";

const portfolioTabs = [
  {
    id: 1,
    portfolioName: "Main Portfolio",
    portfolioAvatar: "🛡️",
    bgColor: "#FFACAC",
    price: "21,400.55",
  },
  {
    id: 2,
    portfolioName: "Second Portfolio",
    portfolioAvatar: "🚀",
    bgColor: "#FFE3AC",
    price: "1,090.00",
  },
  {
    id: 3,
    portfolioName: "Third Portfolio",
    portfolioAvatar: "🥶",
    bgColor: "#FFF7AC",
    price: "0",
  },
];

const Tabs = () => {
  const dispatch = useAppDispatch();
  const selectedTabId = useAppSelector(selectSelectedPortfolioId);
  return (
    <Stack direction="row" width={"100%"} spacing={1}>
      {portfolioTabs.map((tabs) => (
        <TabsItem
          isActive={selectedTabId === tabs.id}
          key={tabs.id}
          {...tabs}
          onClick={() => dispatch(setSelectedPortfolioId(tabs.id))}
        />
      ))}
    </Stack>
  );
};

export default Tabs;
