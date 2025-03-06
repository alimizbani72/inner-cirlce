import { Stack, type StackProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import { FormProvider as RHFForm } from 'react-hook-form';

// ----------------------------------------------------------------------

export type FormProps = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  sx?: StackProps['sx'];
};

export default function FormProvider({ children, onSubmit, methods, sx }: FormProps) {
  return (
    <RHFForm {...methods}>
      <Stack component="form" sx={sx} onSubmit={onSubmit} noValidate autoComplete="off">
        {children}
      </Stack>
    </RHFForm>
  );
}
