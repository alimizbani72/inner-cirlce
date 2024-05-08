// form
// @mui
import type { MuiTelInputProps } from "mui-tel-input";
import { MuiTelInput } from "mui-tel-input";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = MuiTelInputProps & {
  name: string;
};

export default function RHFTelInput({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInput
          {...field}
          MenuProps={{ sx: { maxHeight: "500px", "& .MuiMenu-paper": { borderRadius: 0 } } }}
          forceCallingCode
          focusOnSelectCountry
          fullWidth
          value={typeof field.value === "number" && field.value === 0 ? "" : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...(other as any)}
        />
      )}
    />
  );
}
