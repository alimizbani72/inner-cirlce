'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import type { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

import * as Yup from 'yup';

const UpdateUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .test('invalid character', "Your name can't contain numbers", (val) => !/\d/.test(val)),
  checkbox: Yup.boolean(),
});

const defaultValues = {
  name: '',
  checkbox: false,
};

interface FormProps {}

const Form: FunctionComponent<FormProps> = () => {
  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data) => {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log('🚀 ~ data:', data);
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit} sx={{ gap: 3 }}>
      <RHFTextField name="name" label={'Text input'} placeholder="input hint" />

      <RHFCheckbox label="Text input" name="checkbox" />

      <Button color="primary" size="large" type="submit">
        Button
      </Button>
    </FormProvider>
  );
};

export default Form;
