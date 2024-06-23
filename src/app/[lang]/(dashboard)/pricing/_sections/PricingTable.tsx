import { Icon } from "@/components/icons";
import type { Plan } from "@/lib/features/plans/plansSlice";
import { useAppRouter } from "@/routes/hooks";
import { useFinancialServiceFinancialPayCreateMutation } from "@minecraft/queries";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";
import { useMemo } from "react";

type Props = {
  plans: Plan[];
  rows: Record<string, Array<string | boolean>>;
};

const PricingTable: FC<Props> = ({ plans, rows }) => {
  const { push } = useAppRouter();
  const { mutateAsync, isPending } = useFinancialServiceFinancialPayCreateMutation();
  const tableCelSx = useMemo(
    () => ({
      py: 3,
      px: 2,
      typography: "p2-medium",
      textAlign: "center",
      "&:not(:last-child)": { borderRight: "1.5px solid", borderColor: "dark.3" },
      "&:first-child": { color: "grey.light", textAlign: "start" },
      flex: "1 1 225px",
    }),
    []
  );

  const handlePay = (plan_type: string) => {
    mutateAsync({ requestBody: { plan_type, symbol: "USDC" } })
      .then((response: any) => {
        push(`/checkout/qr-wallet?plan_type=${plan_type}&id=${response?.data?.id}`);
      })
      .catch((error) => enqueueSnackbar({ message: error?.body?.message, variant: "error" }));
  };

  return (
    <Stack>
      <Stack
        sx={{
          borderRadius: 2,
          border: "1.5px solid",
          borderColor: "dark.3",
          overflow: "hidden",
        }}
      >
        <Stack direction="row" bgcolor="dark.2" height={72}>
          <Typography sx={{ ...tableCelSx, flex: "0 0 176px" }}>Plan</Typography>
          {plans.map((plan, index) => (
            <Typography key={`${plan}-${index}`} sx={{ ...tableCelSx, color: "pink.light" }}>
              {plan.title}
            </Typography>
          ))}
        </Stack>
        {Object.entries(rows)?.map(([key, values]) => (
          <Stack
            key={`row-${key}`}
            direction="row"
            sx={{
              height: "72px",
              borderTop: "1.5px solid",
              borderColor: "dark.3",
              "&:last-child": {
                bgcolor: "dark.2",
                ".MuiTypography-root:not(:first-child)": { color: "blue.light" },
              },
            }}
          >
            <Typography sx={{ ...tableCelSx, flex: "0 0 176px" }}>{key}</Typography>
            {values.map((val, index) => (
              <Typography key={index} sx={tableCelSx}>
                {typeof val === "boolean" ? (
                  <Box
                    component={Icon}
                    name={val ? "Check" : "Close"}
                    sx={{ path: { stroke: (theme) => (val ? theme.palette.success.main : theme.palette.danger.main) } }}
                  />
                ) : (
                  val
                )}
              </Typography>
            ))}
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" height={72}>
        <Box sx={{ flex: "0 0 176px" }} />
        {plans.map((plan, index) => (
          <Stack
            key={plan.id}
            flex="1 1 225px"
            sx={{
              py: 2,
              ...(index + 1 === plans.length ? { pl: 2 } : { px: 2 }),
              "&:not(:last-child)": { borderRight: "1.5px solid", borderColor: "dark.3" },
            }}
          >
            <LoadingButton loading={isPending} onClick={() => handlePay(plan?.title.toLowerCase())}>
              {plan.buttonText}
            </LoadingButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PricingTable;
