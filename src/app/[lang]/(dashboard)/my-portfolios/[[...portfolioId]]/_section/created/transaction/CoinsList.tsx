import { RHFAutocomplete } from "@/components/hook-form";
import Image from "@/components/Image";
import useCoinsList from "@/hooks/use-CoinsList";
import { InputAdornment } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { MenuItem, Stack, TextField } from "@mui/material";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

const CoinsList: FC = () => {
  const { coins, isLoading, setSearchQuery, initialCoins } = useCoinsList("");
  const { watch } = useFormContext();
  const selectedCoin = watch("coins");
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
            startAdornment: (
              <>
                {/* Display the selected coin's logo */}
                {selectedCoin?.logo && (
                  <InputAdornment position="start">
                    <Image
                      src={selectedCoin.logo}
                      alt={selectedCoin.name}
                      style={{ width: "24px", height: "24px", marginLeft: "5px" }}
                    />
                  </InputAdornment>
                )}
                {params.InputProps.startAdornment}
              </>
            ),
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
