import type { CSSProperties, ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  style?: CSSProperties;
};

export default function FormProvider({ children, onSubmit, methods, style }: Props) {
  return (
    <Form {...methods}>
      <form style={style} onSubmit={onSubmit}>
        {children}
      </form>
    </Form>
  );
}
