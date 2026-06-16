"use client";

import CustomTable from "@/components/CustomTable";
import Toggle from "@/components/Toggle";
import { Scrollbar } from "@/components/scrollbar";
import { useIsMobile } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import type { PlansType } from "@/routes/type";
import { toNumber } from "@/utils/toNumber";
import { CustomMenuItem, CustomSelect } from "@app-components/CustomSelect";
import { useColumns } from "@dashboard/portfolio-strategies/[slug]/_sections/useColumns";
import { Box, Stack } from "@mui/material";
import { type FC, useEffect, useMemo, useState } from "react";

interface TableProps {
  plan: PlansType;
}

const mockPortfolioStrategies = {
  data: [
    {
      strategy: "Conservative",
      coins: [
        {
          id: "1",
          name: "Bitcoin",
          symbol: "BTC",
          logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          ee_signal: "Buy",
          cmr: "0.82%",
          category: "store_of_value",
          risk_level: "Low",
          potential_multiplier: "1.20",
          distribution: 10,
          gains: "2.1%",
        },
        {
          id: "2",
          name: "Ethereum",
          symbol: "ETH",
          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
          ee_signal: "Hold",
          cmr: "0.65%",
          category: "smart_contracts",
          risk_level: "Mid",
          potential_multiplier: "1.50",
          distribution: 10,
          gains: "1.4%",
        },
        {
          id: "3",
          name: "Tether",
          symbol: "USDT",
          logo: "https://cryptologos.cc/logos/tether-usdt-logo.png",
          ee_signal: "Stable",
          cmr: "0.10%",
          category: "stablecoin",
          risk_level: "Low",
          potential_multiplier: "1.00",
          distribution: 10,
          gains: "0.1%",
        },
        {
          id: "4",
          name: "BNB",
          symbol: "BNB",
          logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
          ee_signal: "Hold",
          cmr: "0.50%",
          category: "exchange_token",
          risk_level: "Mid",
          potential_multiplier: "1.40",
          distribution: 10,
          gains: "1.2%",
        },
        {
          id: "5",
          name: "XRP",
          symbol: "XRP",
          logo: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
          ee_signal: "Hold",
          cmr: "0.45%",
          category: "payments",
          risk_level: "Mid",
          potential_multiplier: "1.30",
          distribution: 10,
          gains: "1.0%",
        },
        {
          id: "6",
          name: "Litecoin",
          symbol: "LTC",
          logo: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
          ee_signal: "Buy",
          cmr: "0.60%",
          category: "payments",
          risk_level: "Mid",
          potential_multiplier: "1.35",
          distribution: 10,
          gains: "1.3%",
        },
        {
          id: "7",
          name: "Chainlink",
          symbol: "LINK",
          logo: "https://cryptologos.cc/logos/chainlink-link-logo.png",
          ee_signal: "Hold",
          cmr: "0.70%",
          category: "oracle",
          risk_level: "Mid",
          potential_multiplier: "1.60",
          distribution: 10,
          gains: "1.5%",
        },
        {
          id: "8",
          name: "Polkadot",
          symbol: "DOT",
          logo: "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
          ee_signal: "Hold",
          cmr: "0.55%",
          category: "layer_0",
          risk_level: "Mid",
          potential_multiplier: "1.70",
          distribution: 10,
          gains: "1.6%",
        },
        {
          id: "9",
          name: "Stellar",
          symbol: "XLM",
          logo: "https://cryptologos.cc/logos/stellar-xlm-logo.png",
          ee_signal: "Hold",
          cmr: "0.40%",
          category: "payments",
          risk_level: "Low",
          potential_multiplier: "1.20",
          distribution: 10,
          gains: "0.9%",
        },
        {
          id: "10",
          name: "Tron",
          symbol: "TRX",
          logo: "https://cryptologos.cc/logos/tron-trx-logo.png",
          ee_signal: "Hold",
          cmr: "0.42%",
          category: "smart_contracts",
          risk_level: "Mid",
          potential_multiplier: "1.25",
          distribution: 5,
          gains: "1.0%",
        },
        {
          id: "11",
          name: "Monero",
          symbol: "XMR",
          logo: "https://cryptologos.cc/logos/monero-xmr-logo.png",
          ee_signal: "Hold",
          cmr: "0.48%",
          category: "privacy",
          risk_level: "Mid",
          potential_multiplier: "1.30",
          distribution: 5,
          gains: "1.1%",
        },
        {
          id: "12",
          name: "Cosmos",
          symbol: "ATOM",
          logo: "https://cryptologos.cc/logos/cosmos-atom-logo.png",
          ee_signal: "Hold",
          cmr: "0.58%",
          category: "layer_0",
          risk_level: "Mid",
          potential_multiplier: "1.50",
          distribution: 5,
          gains: "1.3%",
        },
      ],
    },
    {
      strategy: "Balanced",
      coins: [
        {
          id: "2-1",
          name: "Bitcoin",
          symbol: "BTC",
          logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
          ee_signal: "Buy",
          cmr: "0.82%",
          category: "store_of_value",
          risk_level: "Low",
          potential_multiplier: "1.30",
          distribution: 30,
          gains: "2.5%",
        },
        {
          id: "2-2",
          name: "Solana",
          symbol: "SOL",
          logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
          ee_signal: "Buy",
          cmr: "1.10%",
          category: "layer_1",
          risk_level: "High",
          potential_multiplier: "2.20",
          distribution: 25,
          gains: "4.2%",
        },
        {
          id: "2-3",
          name: "Cardano",
          symbol: "ADA",
          logo: "https://cryptologos.cc/logos/cardano-ada-logo.png",
          ee_signal: "Hold",
          cmr: "0.55%",
          category: "layer_1",
          risk_level: "High",
          potential_multiplier: "1.80",
          distribution: 25,
          gains: "2.0%",
        },
        {
          id: "2-4",
          name: "Ethereum",
          symbol: "ETH",
          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
          ee_signal: "Hold",
          cmr: "0.65%",
          category: "smart_contracts",
          risk_level: "High",
          potential_multiplier: "1.60",
          distribution: 20,
          gains: "1.8%",
        },
      ],
    },
    {
      strategy: "Aggressive",
      coins: [
        {
          id: "3-1",
          name: "Arbitrum",
          symbol: "ARB",
          logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
          ee_signal: "Buy",
          cmr: "1.50%",
          category: "layer_2",
          risk_level: "Low",
          potential_multiplier: "3.50",
          distribution: 25,
          gains: "6.5%",
        },
        {
          id: "3-2",
          name: "Avalanche",
          symbol: "AVAX",
          logo: "https://cryptologos.cc/logos/avalanche-avax-logo.png",
          ee_signal: "Buy",
          cmr: "1.20%",
          category: "layer_1",
          risk_level: "Mid",
          potential_multiplier: "2.80",
          distribution: 25,
          gains: "5.1%",
        },
        {
          id: "3-3",
          name: "Dogecoin",
          symbol: "DOGE",
          logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
          ee_signal: "Speculative",
          cmr: "2.10%",
          category: "meme_coin",
          risk_level: "High",
          potential_multiplier: "4.00",
          distribution: 20,
          gains: "7.8%",
        },
        {
          id: "3-4",
          name: "Solana",
          symbol: "SOL",
          logo: "https://cryptologos.cc/logos/solana-sol-logo.png",
          ee_signal: "Buy",
          cmr: "1.10%",
          category: "layer_1",
          risk_level: "Low",
          potential_multiplier: "2.50",
          distribution: 30,
          gains: "5.9%",
        },
      ],
    },
  ],
};
const PortfolioTable: FC<TableProps> = () => {
  const content = mockPortfolioStrategies;
  const isLoading = false;

  const [value, setValue] = useState<string>(
    mockPortfolioStrategies.data[0]?.strategy || "",
  );
  const isMobile = useIsMobile();
  const { t } = useTranslate();
  const { columns } = useColumns();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (content.data.length && !value) {
      setValue(content.data[0].strategy);
    }
  }, [content.data, value]);
  const coins =
    content.data.find((item) => item.strategy === value)?.coins || [];

  const options = useMemo(
    () =>
      content.data.map((item) => ({
        label: item.strategy,
        value: item.strategy,
      })),
    [content.data],
  );

  return (
    <Stack gap={3}>
      {isLoading ? (
        <Box
          className="loading-skeleton"
          height={40}
          width={250}
          sx={{ ml: 4 }}
        />
      ) : (
        !!options.length &&
        (isMobile ? (
          <CustomSelect
            value={value}
            onChange={(event) => handleChange(event.target.value as string)}
            sx={{ mx: 3 }}
          >
            {options.map((option) => (
              <CustomMenuItem key={option.value} value={option.value}>
                {option.label}
              </CustomMenuItem>
            ))}
          </CustomSelect>
        ) : (
          <Scrollbar>
            <Stack pl={{ md: 4, xs: 3 }}>
              <Stack pr={{ md: 4, xs: 3 }}>
                {!!content.data.length && (
                  <Toggle
                    setValue={handleChange}
                    buttons={options}
                    value={value}
                  />
                )}
              </Stack>
            </Stack>
          </Scrollbar>
        ))
      )}

      <Stack
        px={{ md: 4, xs: 0 }}
        pb={3}
        sx={{
          "table tbody tr td": {
            textWrap: "nowrap",
          },
        }}
      >
        <CustomTable
          title={`${value} ${t("portfolioTable.strategy")}`}
          columns={columns}
          data={coins}
          isPending={isLoading}
          isStickyFirstColumn
          containerHeight={
            toNumber(coins.length) > 10 ? undefined : "max-content"
          }
        />
      </Stack>
    </Stack>
  );
};

export default PortfolioTable;
