import { RHFAutocomplete } from "@/components/hook-form";
import Image from "@/components/Image";
import { useDebounce } from "@/hooks/use-debounce";
import { usePortfolioServiceCoinsQuery } from "@minecraft/queries";
import { CircularProgress } from "@mui/material";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useState, useEffect, type FC } from "react";

// Custom Hook to manage coins list fetching and state
const useCoinsList = (initialQuery: string) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [initialCoins, setInitialCoins] = useState<any[]>([]);
  const [coins, setCoins] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchQuery, 500);

  const filteropts = {
    page: 1,
    per_page: 15,
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

// CoinsList Component
const CoinsList: FC = () => {
  const { coins, isLoading, setSearchQuery, initialCoins } = useCoinsList("");

  return (
    <RHFAutocomplete
      id="coin-search"
      size="small"
      name="coins"
      placeholder="Enter coin name or symbol"
      noOptionsText="No coins found"
      options={coins.length ? coins : initialCoins}
      getOptionLabel={(option) => {
        if (typeof option === "object" && option !== null) {
          return `${option.name} (${option.symbol})`;
        }
        return "";
      }}
      isOptionEqualToValue={(option, value) => {
        if (typeof option === "object" && option !== null) {
          return option.symbol === value.symbol;
        }
        return false;
      }}
      loading={isLoading}
      onInputChange={(_event, value) => {
        setSearchQuery(value);
      }}
      filterOptions={(options) => options}
      renderOption={(props, option) => (
        <MenuItem {...props} key={option.symbol} value={option.symbol}>
          <Stack direction={"row"} spacing={2}>
            <Image src={option.logo} alt={option.name} style={{ width: "24px", height: "24px" }} />
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              {option.name} - {option.symbol}
            </Stack>
          </Stack>
        </MenuItem>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Enter coin name or symbol"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default CoinsList;
