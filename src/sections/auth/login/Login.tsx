'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';

export const FormSchema = Yup.object().shape({
  password: Yup.string().required('Password is required').min(8, 'Your password is too short.'),
  email: Yup.string().required('please enter your email address').email('email address is incorrect'),
});

const defaultValues = {
  password: '',
  email: '',
};

const LoginSection = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues,
    mode: 'onSubmit',
  });
  const { handleSubmit, setError } = methods;

  const onSubmit = handleSubmit(async (data) => {
    // await signIn("custom-login", {
    //   password: data.password,
    //   username: data.phone,
    //   redirect: true,
    //   callbackUrl: "/",
    // });
    setLoading(true);
    const res = await signIn('custom-login', { password: data.password, email: data.email, redirect: false });
    if (res?.ok) {
      push('/');
      setLoading(false);
    } else {
      setLoading(false);
      setError('email', { message: 'Email or password is wrong' });
    }
  });

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 5,
        width: '100%',
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center ',
        alignItems: 'center',
      }}
    >
      <FormProvider
        methods={methods}
        onSubmit={onSubmit}
        style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
        <Stack spacing={5}>
          <RHFTextField type="text" name="email" size="small" />
          <RHFTextField type={'password'} name="password" size="small" />
        </Stack>

        <LoadingButton
          loading={loading}
          sx={{ mt: 5, maxWidth: '600px' }}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign In
        </LoadingButton>
      </FormProvider>
    </Box>
  );
};

export default LoginSection;
