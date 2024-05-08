import type { StackProps } from "@mui/material";
import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import type { UseFormReturn } from "react-hook-form";
import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  sx?: StackProps["sx"];
};

export default function FormProvider({ children, onSubmit, methods, sx }: Props) {
  return (
    <Form {...methods}>
      <Stack component="form" sx={sx} onSubmit={onSubmit}>
        {children}
      </Stack>
    </Form>
  );
}
