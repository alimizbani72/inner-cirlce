// @mui
import { InputLabel } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, id, label, helperText, type, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <InputLabel shrink htmlFor={id || name}>
              {label}
            </InputLabel>
          )}
          <TextField
            {...field}
            id={id || name}
            fullWidth
            type={type}
            value={type === "number" && field.value === 0 ? "" : field.value}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
            autoComplete="nope"
          />
        </div>
      )}
    />
  );
}
