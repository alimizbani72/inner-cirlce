// @mui
import FormHelperText from '@mui/material/FormHelperText';
import type { MuiOtpInputProps } from 'mui-one-time-password-input';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { Controller, useFormContext } from 'react-hook-form';

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
};

export default function RHFCode({ name, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
              sx: { width: '95px' },
              inputProps: {
                inputMode: 'numeric',
                pattern: '[0-9]*',
              },
            }}
            {...other}
          />

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
