import { IconButton, InputLabel, Stack } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import type { MuiOtpInputProps } from "mui-one-time-password-input";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Controller, useFormContext } from "react-hook-form";
import { Icon } from "../icons";
import { useIsMobile } from "@/hooks/use-responsive";

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
  label?: string;
  loading?: boolean;
};

export default function RHFCode({ name, label, loading, ...other }: RHFCodesProps) {
  const { control } = useFormContext();
  const isMobile = useIsMobile();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          {label && (
            <InputLabel sx={{ typography: "caption-semi-bold", textTransform: "uppercase" }} shrink>
              {label}
            </InputLabel>
          )}
          <Stack direction={isMobile ? "column" : "row"} alignItems={"center"} justifyContent={"space-between"} gap={4}>
            <MuiOtpInput
              {...field}
              autoFocus
              gap={1.5}
              length={6}
              TextFieldsProps={{
                error: !!error,
                placeholder: "-",
                sx: { maxWidth: "56px" },
                inputProps: {
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
              {...other}
            />
            {loading && (
              <IconButton
                disabled
                sx={{
                  animation: "spin 2s linear infinite",
                  width: "24px",
                  height: "24px",
                  path: { stroke: (theme) => theme.palette.pink.light },
                }}
              >
                <Icon name="Loading" color="pink.light" />
              </IconButton>
            )}
          </Stack>

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
