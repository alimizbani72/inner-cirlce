import { IconButton, InputLabel, Stack } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import Icon from '../icon';

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
  ignoreErrorMessage?: boolean;
};

export function RHFTextField({
  name,
  id,
  label,
  helperText,
  type,
  isMoney,
  ignoreErrorMessage,
  ...other
}: Props) {
  const { control, setValue, resetField } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack sx={{ width: '100%' }}>
          {label && (
            <InputLabel
              sx={{
                typography: 'body2-medium',
                textTransform: 'uppercase',
                color: 'common.white',
                mb: 1,
              }}
              htmlFor={id || name}
            >
              {label}
            </InputLabel>
          )}
          <TextField
            {...field}
            id={id || name}
            fullWidth
            type={type === 'number' ? 'text' : type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
            }}
            error={!!error}
            helperText={ignoreErrorMessage || !error ? helperText : error?.message}
            {...other}
            autoComplete="nope"
            slotProps={{
              input: {
                inputComponent: isMoney ? (NumericFormatCustom as any) : 'input',
                ...other.slotProps?.input,

                endAdornment: (
                  <Stack direction="row" gap={1}>
                    {(other.slotProps?.input as any)?.endAdornment as any}
                    {error && (
                      <IconButton
                        onClick={() => {
                          setValue(name, '');
                          resetField(name);
                        }}
                      >
                        <Icon name="CloseIcon" />
                      </IconButton>
                    )}
                  </Stack>
                ),
              },
              htmlInput: {
                ...(type === 'number'
                  ? {
                      inputMode: 'numeric',
                      pattern: '[0-9]*',
                      sx: { textAlign: 'left' },
                    }
                  : {}),
                ...other?.slotProps?.htmlInput,
              },
            }}
          />
        </Stack>
      )}
    />
  );
}
