import { TextField } from "@mui/material";
// @mui
import { Controller, useFormContext } from "react-hook-form";
import { AutoComplete, type AutoCompleteProps } from "../AutoComplete";

// ----------------------------------------------------------------------

interface Props extends Omit<AutoCompleteProps, "onChange"> {
  name: string;
  placeholder?: string;
}

export default function RHFAutocomplete({ name, placeholder, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, ...field } }) => (
        <AutoComplete
          onChange={(value) => onChange(value)}
          value={field.value}
          multiple
          renderValue={other.renderValue}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              inputRef={ref}
              fullWidth
              sx={{ ".MuiInputBase-root": { pr: "9px !important", py: "2px !important" } }}
              placeholder={placeholder}
            />
          )}
          {...other}
        />
      )}
    />
  );
}
