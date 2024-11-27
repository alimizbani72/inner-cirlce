import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import type { SelectProps } from "@mui/material/Select";
import Select from "@mui/material/Select";
// @mui
import type { SxProps, Theme } from "@mui/material/styles";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

type RHFSelectProps = TextFieldProps & {
  name: string;
  native?: boolean;
  maxHeight?: boolean | number;
  children: ReactNode;
  PaperPropsSx?: SxProps<Theme>;
};

export function RHFSelect({
  name,
  native,
  maxHeight = 220,
  helperText,
  children,
  label,
  PaperPropsSx,
  ...other
}: RHFSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box width="100%">
          {label && (
            <InputLabel
              sx={{
                typography: "caption-semi-bold",
                textTransform: "uppercase",
                color: "white",
              }}
              shrink
              htmlFor={name}
            >
              {label}
            </InputLabel>
          )}
          <TextField
            {...field}
            select
            fullWidth
            SelectProps={{
              native,
              MenuProps: {
                disableScrollLock: true,
                PaperProps: {
                  sx: {
                    ...(!native && {
                      maxHeight: typeof maxHeight === "number" ? maxHeight : "unset",
                      bgcolor: "dark.2",
                      backgroundImage: "none",
                      boxShadow: "none",
                      color: "white",
                    }),
                    ...PaperPropsSx,
                  },
                },
              },
              sx: {
                textTransform: "capitalize",
                "& .MuiSvgIcon-root": { color: "grey.light" },
              },
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
            placeholder="sss"
          >
            {children}
          </TextField>
        </Box>
      )}
    />
  );
}

// ----------------------------------------------------------------------

type RHFMultiSelectProps = SelectProps & {
  name: string;
  label?: string;
  chip?: boolean;
  checkbox?: boolean;
  placeholder?: string;
  helperText?: ReactNode;
  options: {
    label: string;
    value: string;
  }[];
};

export function RHFMultiSelect({
  name,
  chip,
  label,
  options,
  checkbox,
  placeholder,
  helperText,
  sx,
  renderValue: renderValuesProps,
  ...other
}: RHFMultiSelectProps) {
  const { control } = useFormContext();

  const renderValues = (selectedIds: string[]) => {
    const selectedItems = options.filter((item) => selectedIds.includes(item.value));

    if (!selectedItems.length && placeholder) {
      return (
        <Box component="em" sx={{ color: "text.disabled" }}>
          {placeholder}
        </Box>
      );
    }

    if (chip) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selectedItems.map((item) => (
            <Chip key={item.value} size="small" label={item.label} />
          ))}
        </Box>
      );
    }

    return selectedItems.map((item) => item.label).join(", ");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl sx={sx}>
          <Stack width="inherit" height="auto">
            {label && (
              <InputLabel id={name} sx={{ position: "relative" }}>
                {label}
              </InputLabel>
            )}

            <Select
              {...field}
              multiple
              displayEmpty={!!placeholder}
              labelId={name}
              input={<OutlinedInput fullWidth label={label} error={!!error} />}
              renderValue={renderValuesProps || renderValues}
              {...other}
            >
              {placeholder && (
                <MenuItem disabled value="">
                  <em> {placeholder} </em>
                </MenuItem>
              )}

              {options?.map((option) => {
                const selected = field?.value?.includes(option?.value);

                return (
                  <MenuItem key={option.value} value={option.value}>
                    {checkbox && <Checkbox size="small" disableRipple checked={selected} />}

                    {option.label}
                  </MenuItem>
                );
              })}
            </Select>

            {(!!error || helperText) && (
              <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
            )}
          </Stack>
        </FormControl>
      )}
    />
  );
}
