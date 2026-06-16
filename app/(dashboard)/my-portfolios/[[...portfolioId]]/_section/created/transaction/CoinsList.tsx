import { RHFAutocomplete } from "@/components/hook-form";
import { Image } from "@/components/image";
import { Scrollbar } from "@/components/scrollbar";
import useCoinsList from "@/hooks/use-CoinsList";
import { useTranslate } from "@/locales";
import {
  CircularProgress,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

const CoinsList: FC = () => {
  const { coins, isLoading, setSearchQuery, initialCoins } = useCoinsList("");
  const { watch } = useFormContext();
  const { t } = useTranslate();
  const selectedCoin = watch("coins");
  return (
    <Stack spacing={1}>
      <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
        {t("portfolioTransaction.coins")}
      </Typography>
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
        slotProps={{
          listbox: {
            component: Scrollbar,
          },
        }}
        loading={isLoading}
        onInputChange={(_event, value) => {
          setSearchQuery(value);
        }}
        filterOptions={(options) => options}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.slug} value={option.symbol}>
            <Stack direction={"row"} spacing={2}>
              {/* <Image
                src={option.logo}
                alt={option.name}
                style={{ width: '24px', height: '24px' }}
              /> */}
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
            slotProps={{
              input: {
                ...params.InputProps,
                startAdornment: (
                  <>
                    {selectedCoin?.logo && (
                      <InputAdornment position="start">
                        <Image
                          src={selectedCoin.logo}
                          alt={selectedCoin.name}
                          style={{
                            width: "24px",
                            height: "24px",
                            marginLeft: "5px",
                          }}
                        />
                      </InputAdornment>
                    )}
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
      />
    </Stack>
  );
};

export default CoinsList;
