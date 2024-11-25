import { TextField, Typography } from "@mui/material";
// @mui
import { Controller, useFormContext } from "react-hook-form";
import { AutoComplete, type AutoCompleteProps } from "../AutoComplete";

// ----------------------------------------------------------------------

interface Props extends Omit<AutoCompleteProps, "onChange"> {
  name: string;
  placeholder?: string;
}

export default function RHFAutocomplete({ name, placeholder, renderInput, ...other }: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, onChange, ...field } }) => (
        <AutoComplete
          onChange={(value) => onChange(value)}
          value={field.value}
          renderValue={other.renderValue}
          renderInput={
            renderInput
              ? renderInput
              : (params) => (
                  <TextField
                    {...params}
                    {...field}
                    inputRef={ref}
                    fullWidth
                    sx={{ ".MuiInputBase-root": { pr: "9px !important", py: "2px !important" } }}
                    placeholder={placeholder}
                  />
                )
          }
          renderOption={
            other.multiple
              ? (_, option) => (
                  <Typography
                    onClick={() => {
                      onChange(field.value ? [...field.value, option] : [option]);
                    }}
                    p={1}
                    variant="p2-medium"
                    component="div"
                    {...option}
                    sx={{ cursor: "pointer", color: "common.white", "&:hover": { bgcolor: "dark.2" } }}
                  >
                    {option.label}
                  </Typography>
                )
              : other.renderOption
          }
          {...other}
        />
      )}
    />
  );
}
