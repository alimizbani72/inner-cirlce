import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import type { Plan } from "@/lib/features/plans/plansSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useMemo } from "react";

type Props = {
  plansData: Plan[];
  rows: Record<string, Array<string | boolean>>;
  userType: string;
  handlePayment: (plan_type: string) => Promise<void>;
  isPending?: boolean;
};

const PricingTable: FC<Props> = ({ plansData, rows, userType, handlePayment, isPending }) => {
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
          {plansData.map((plan, index) => (
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
        {plansData.map((plan, index) => (
          <Stack
            key={plan.id}
            flex="1 1 225px"
            sx={{
              py: 2,
              ...(index + 1 === plansData.length ? { pl: 2 } : { px: 2 }),
              "&:not(:last-child)": { borderRight: "1.5px solid", borderColor: "dark.3" },
            }}
          >
            <LoadingButton
              loading={isPending}
              onClick={() => handlePayment(plan?.title.toLowerCase())}
              disabled={
                plans[userType as keyof typeof plans]?.order >= plans[plan.plan_type as keyof typeof plans]?.order
              }
            >
              {plan.buttonText}
            </LoadingButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PricingTable;
