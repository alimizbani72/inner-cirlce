"use client";
import Scrollbar from "@/components/Scrollbar";
import { selectSelectedPortfolioId } from "@/lib/features/portfolio/portfolioSlice";
import { useAppSelector } from "@/lib/hooks";
import { Stack, Typography } from "@mui/material";
import CryptoIcon from "./CryptoIcons";
import CustomAssetTable from "./CustomAssetTable";
import numeral from "numeral";
import MoreTableAction from "./MoreTableAction";

const portfolioAssetsData = {
  1: [
    {
      id: 1,
      name: "Bitcoin BTC",
      currentHoldings: "0.02 BTC",
      actualPrice: "42,600.04",
      actualValue: "-22222222",
      exitProximity: "20%",
      distribution: "35%",
      totalBought: "0.01 BTC",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000,000",
      transactions: [
        {
          id: 1,
          quantity: "20.500,00",
          pricePerCoin: "42,600.00",
          fee: "15.20",
          exitProximity: "20%",
          dateTime: "11 OCT, 2024, 11:45 AM",
        },
        {
          id: 2,
          quantity: "10.000,00",
          pricePerCoin: "41,500.00",
          fee: "12.50",
          exitProximity: "18%",
          dateTime: "15 OCT, 2024, 12:45 PM",
          note: "Test transaction",
        },
      ],
    },
    {
      id: 2,
      name: "Ethereum ETH",
      currentHoldings: "0.02 ETH",
      actualPrice: "3,900.00",
      actualValue: "6,585.32",
      exitProximity: "20%",
      distribution: "35%",
      totalBought: "0.01 ETH",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "-2,000",
      transactions: [
        {
          id: 1,
          quantity: "40.100,00",
          pricePerCoin: "3,900.00",
          fee: "10.55",
          exitProximity: "20%",
          dateTime: "10 OCT, 2024, 10:36 PM",
          note: "There is a note here",
        },
        {
          id: 2,
          quantity: "40.100,00",
          pricePerCoin: "3,900.00",
          fee: "10.55",
          exitProximity: "20%",
          dateTime: "10 OCT, 2024, 10:38 PM",
          note: "Another note here",
        },
        {
          id: 3,
          quantity: "50.000,00",
          pricePerCoin: "4,000.00",
          fee: "12.00",
          exitProximity: "22%",
          dateTime: "12 OCT, 2024, 11:00 AM",
          note: "Bought more ETH",
        },
      ],
    },
    {
      id: 3,
      name: "BNB BNB",
      currentHoldings: "0.02 BNB",
      actualPrice: "320.00",
      actualValue: "6,585.32",
      exitProximity: "20%",
      distribution: "35%",
      totalBought: "0.01 BNB",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000",
      transactions: [
        {
          id: 1,
          quantity: "10.500,00",
          pricePerCoin: "320.00",
          fee: "2.50",
          exitProximity: "15%",
          dateTime: "14 OCT, 2024, 09:25 AM",
          note: "Bought BNB",
        },
      ],
    },
  ],
  2: [
    {
      id: 4,
      name: "BNB BNB",
      currentHoldings: "50.00 BNB",
      actualPrice: "0.98",
      actualValue: "49.00",
      exitProximity: "30%",
      distribution: "20%",
      totalBought: "40.00 BNB",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000",
      transactions: [
        {
          id: 1,
          quantity: "30.000,00",
          pricePerCoin: "0.95",
          fee: "1.00",
          exitProximity: "25%",
          dateTime: "10 OCT, 2024, 04:15 PM",
          note: "Initial investment",
        },
        {
          id: 2,
          quantity: "20.000,00",
          pricePerCoin: "0.99",
          fee: "1.50",
          exitProximity: "30%",
          dateTime: "11 OCT, 2024, 02:20 PM",
          note: "Added more BNB",
        },
      ],
    },
    {
      id: 5,
      name: "Ethereum ETH",
      currentHoldings: "10.00 ETH",
      actualPrice: "15.00",
      actualValue: "150.00",
      exitProximity: "25%",
      distribution: "15%",
      totalBought: "7.00 ETH",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000",
      transactions: [
        {
          id: 1,
          quantity: "5.000,00",
          pricePerCoin: "15.00",
          fee: "0.75",
          exitProximity: "20%",
          dateTime: "08 OCT, 2024, 03:15 PM",
          note: "Test transaction",
        },
        {
          id: 2,
          quantity: "2.000,00",
          pricePerCoin: "14.00",
          fee: "0.50",
          exitProximity: "18%",
          dateTime: "09 OCT, 2024, 10:25 AM",
          note: "Bought on dip",
        },
      ],
    },
  ],
  3: [
    {
      id: 6,
      name: "Ethereum ETH",
      currentHoldings: "5.00 ETH",
      actualPrice: "10.00",
      actualValue: "50.00",
      exitProximity: "10%",
      distribution: "10%",
      totalBought: "3.00 ETH",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000",
      transactions: [
        {
          id: 1,
          quantity: "2.000,00",
          pricePerCoin: "9.00",
          fee: "0.25",
          exitProximity: "8%",
          dateTime: "06 OCT, 2024, 05:35 PM",
          note: "First ETH purchase",
        },
        {
          id: 2,
          quantity: "1.000,00",
          pricePerCoin: "10.00",
          fee: "0.15",
          exitProximity: "12%",
          dateTime: "07 OCT, 2024, 11:10 AM",
          note: "Second ETH purchase",
        },
      ],
    },
    {
      id: 7,
      name: "VeChain VET",
      currentHoldings: "500.00 VET",
      actualPrice: "0.02",
      actualValue: "10.00",
      exitProximity: "5%",
      distribution: "5%",
      totalBought: "300.00 VET",
      totalSold: "0.01 BTC",
      totalInvest: "4,500",
      totalRealized: "4,500",
      profit: "2,000",
      transactions: [
        {
          id: 1,
          quantity: "300.000,00",
          pricePerCoin: "0.02",
          fee: "0.10",
          exitProximity: "4%",
          dateTime: "09 OCT, 2024, 01:45 PM",
          note: "Initial purchase",
        },
      ],
    },
  ],
};

const columns = [
  {
    title: "NAME",
    field: "name",
    modify: (row: any) => (
      <Stack direction={"row"} alignItems={"center"} spacing={1} flex={2}>
        <MoreTableAction />
        <CryptoIcon name={row.name.split(" ")[0]} ticker={row.name.split(" ")[1]} />
      </Stack>
    ),
  },
  {
    title: "Current Holdings $",
    field: "currentHoldings",
    modify: (row: any) => row.currentHoldings,
  },
  {
    title: "Actual Price $",
    field: "actualPrice",
    modify: (row: any) => `$${numeral(row.actualPrice).format("0,0.00")}`,
  },
  {
    title: "Actual Value $",
    field: "actualValue",
    modify: (row: any) => (
      <Typography variant="p2-medium" color={parseFloat(row.actualValue) <= 0 ? "error.main" : "success.main"}>
        ${numeral(row.actualValue).format("0,0.00")}
      </Typography>
    ),
  },
  {
    title: "Exit Proximity",
    field: "exitProximity",
    modify: (row: any) => (
      <Typography variant="p2-medium" color={parseFloat(row.exitProximity) <= 0 ? "error.main" : "success.main"}>
        {row.exitProximity}
      </Typography>
    ),
  },
  {
    title: "Distribution%",
    field: "distribution",
    modify: (row: any) => row.distribution,
  },
  {
    title: "Total bought",
    field: "totalBought",
    modify: (row: any) => row.totalBought,
  },
  {
    title: "Total Sold",
    field: "totalSold",
    modify: (row: any) => row.totalSold,
  },
  {
    title: "Total Invest $",
    field: "totalInvest",
    modify: (row: any) => `$${numeral(row.totalInvest).format("0,0.00")}`,
  },
  {
    title: "Total Realized $",
    field: "totalRealized",
    modify: (row: any) => `$${numeral(row.totalRealized).format("0,0.00")}`,
  },
  {
    title: "Profit $",
    field: "profit",
    modify: (row: any) => (
      <Typography variant="p2-medium" color={parseFloat(row.profit) <= 0 ? "error.main" : "success.main"}>
        ${numeral(row.profit).format("0,0.00")}
      </Typography>
    ),
  },
];

const AssetsTable = () => {
  const selectedTabId = useAppSelector(selectSelectedPortfolioId);
  const data = (portfolioAssetsData as any)[selectedTabId] || [];
  return (
    <Stack
      sx={{
        ".os-scrollbar-handle": {
          cursor: "pointer",
          backgroundColor: "grey.dark",
          "&:hover": { backgroundColor: "grey.dark" },
        },
      }}
    >
      <Stack pl={{ xs: 3, md: 4 }} pb={5}>
        <Scrollbar options={{ scrollbars: { clickScroll: true, autoHide: "never" } }}>
          <Stack
            alignItems="flex-start"
            maxWidth={{ md: "calc(100vw - 281px)", xs: "calc(100vw - 48px)" }}
            sx={{
              "> div": {
                borderBottomRightRadius: { xs: undefined, md: 0 },
                borderTopRightRadius: { xs: undefined, md: 0 },
                borderRight: { xs: undefined, md: 0 },
              },
            }}
          >
            <CustomAssetTable minWidthCell={285} title={"Assets"} columns={columns} data={data} />
          </Stack>
        </Scrollbar>
      </Stack>
    </Stack>
  );
};

export default AssetsTable;
