import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Autocomplete from "@mui/material/Autocomplete";
// @mui
import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

interface Props<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: ReactNode;
  hasMore?: boolean;
  loadMore?: () => void;
}

export default function RHFAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  name,
  label,
  placeholder,
  helperText,
  hasMore,
  loadMore,
  renderInput,
  ...other
}: Omit<Props<T, Multiple, DisableClearable, FreeSolo>, "renderInput"> & {
  renderInput?: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>["renderInput"];
}) {
  const { control, setValue } = useFormContext();

  const handleScroll = (event: any) => {
    const { target } = event;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 200 && hasMore) {
      loadMore?.();
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          sx={{
            "& .MuiInputBase-sizeSmall": {
              borderRadius: "10px",
            },
            "& .MuiAutocomplete-tag": {
              bgcolor: "grey.400",
            },
            "& .MuiChip-deleteIcon": {
              color: "red",
            },
            "& .MuiChip-label": {
              color: "grey.900",
            },
          }}
          onChange={(_, newValue) => setValue(name, newValue, { shouldValidate: true })}
          ListboxProps={{
            ...other.ListboxProps,
            onScroll: (event) => {
              other.ListboxProps?.onScroll?.(event);
              handleScroll(event);
            },
          }}
          renderInput={
            renderInput ||
            ((params) => (
              <TextField
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error?.message : helperText}
                {...params}
              />
            ))
          }
          {...other}
        />
      )}
    />
  );
}
