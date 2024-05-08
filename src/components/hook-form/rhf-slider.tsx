// @mui
import FormHelperText from "@mui/material/FormHelperText";
import type { SliderProps } from "@mui/material/Slider";
import Slider from "@mui/material/Slider";
import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = SliderProps & {
  name: string;
  helperText?: ReactNode;
};

export default function RHFSlider({ name, helperText, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <Slider {...field} valueLabelDisplay="auto" {...other} />

          {(!!error || helperText) && (
            <FormHelperText error={!!error}>{error ? error?.message : helperText}</FormHelperText>
          )}
        </>
      )}
    />
  );
}
