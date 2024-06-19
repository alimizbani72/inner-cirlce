import { InputLabel, Stack } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { NumericFormat, type NumericFormatProps } from "react-number-format";

// ----------------------------------------------------------------------

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const NumericFormatCustom = forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({ target: { name: props.name, value: values.value } });
        }}
        thousandSeparator=","
      />
    );
  }
);

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  isMoney?: boolean;
};

export default function RHFTextField({ name, id, label, helperText, type, isMoney, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ width: "100%" }}>
          {label && (
            <InputLabel
              sx={{ typography: "caption-semi-bold", textTransform: "uppercase", color: "white" }}
              shrink
              htmlFor={id || name}
            >
              {label}
            </InputLabel>
          )}
          <TextField
            {...field}
            id={id || name}
            fullWidth
            type={type === "number" ? "text" : type}
            value={type === "number" && field.value === 0 ? "" : field.value}
            onChange={(event) => {
              if (type === "number") {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            inputProps={{
              ...(type === "number"
                ? { inputMode: "numeric", pattern: "[0-9]*", sx: { textAlign: "left", ...other.inputProps?.sx } }
                : {}),
              ...other.inputProps,
            }}
            error={!!error}
            helperText={error ? error?.message : helperText}
            {...other}
            autoComplete="nope"
            // eslint-disable-next-line react/jsx-no-duplicate-props
            InputProps={{
              inputComponent: isMoney ? (NumericFormatCustom as any) : "input",
              ...other.InputProps,
            }}
          />
        </Stack>
      )}
    />
  );
}
