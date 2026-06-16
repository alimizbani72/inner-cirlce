import { customInstance } from "@/scripts/fetcher";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDebounce } from "./use-debounce";
type Coin = {
  id: string;
  name: string;
  symbol: string;
  slug: string;
};

type CoinsResponse = {
  data: Coin[];
};
export const useGetCoins = (params?: any, options?: any) => {
  return useQuery<CoinsResponse>({
    queryKey: ["coins", params],
    queryFn: async () => {
      const res = await customInstance<CoinsResponse>({
        url: "/coins",
        params,
      });

      return res ?? { data: [] };
    },
    enabled: options?.query?.enabled ?? true,
  });
};
const useCoinsList = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteropts = useMemo(
    () => ({
      page: 1,
      per_page: 100,
      filters: {
        query: debouncedSearch,
      },
    }),
    [debouncedSearch],
  );

  const { data, isLoading } = useGetCoins(
    { opts: JSON.stringify(filteropts) },
    {
      query: {
        enabled: true,
      },
    },
  );

  const coins = useMemo(() => {
    return data?.data ?? [];
  }, [data]);

  const initialCoins = useMemo(() => {
    // keep original unfiltered list (when empty search)
    return debouncedSearch ? [] : coins;
  }, [coins, debouncedSearch]);

  return {
    coins,
    isLoading,
    setSearchQuery,
    initialCoins,
  };
};
export default useCoinsList;
