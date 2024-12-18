import { useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { usePortfolioServiceCoinsQuery } from "@minecraft/queries";

const useCoinsList = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [initialCoins, setInitialCoins] = useState<any[]>([]);
  const [coins, setCoins] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteropts = {
    page: 1,
    per_page: 20,
    filters: {
      query: debouncedSearch,
    },
  };

  const { data, isLoading } = usePortfolioServiceCoinsQuery({ opts: JSON.stringify(filteropts) });

  useEffect(() => {
    // Set initial coins on first load
    if (!debouncedSearch && data?.data) {
      setInitialCoins(data.data);
      setCoins(data.data);
    } else if (debouncedSearch && data?.data) {
      // Set filtered coins when searching
      setCoins(data.data);
    }
  }, [data, debouncedSearch]);

  return { coins, isLoading, setSearchQuery, initialCoins };
};
export default useCoinsList;
