import { Icon } from "@/components/icons";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import { useMemo } from "react";

type Props = {
  plans: Array<string>;
  rows: Record<string, Array<string | boolean>>;
};

const PricingTable: FC<Props> = ({ plans, rows }) => {
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
          <Typography sx={{ ...tableCelSx }}>Plan</Typography>
          {plans.map((plan) => (
            <Typography key={plan} sx={{ ...tableCelSx, color: "pink.light" }}>
              {plan}
            </Typography>
          ))}
        </Stack>
        {Object.entries(rows)?.map(([key, values]) => (
          <Stack
            key={key}
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
            <Typography sx={{ ...tableCelSx }}>{key}</Typography>
            {values.map((val, index) => (
              <Typography key={index} sx={tableCelSx}>
                {typeof val === "boolean" ? (
                  <Box
                    component={Icon}
                    name={val ? "Check" : "Close"}
                    sx={{
                      path: {
                        stroke: (theme) => (val ? theme.palette.success.main : theme.palette.danger.main),
                      },
                    }}
                  />
                ) : (
                  val
                )}
              </Typography>
            ))}
          </Stack>
        ))}
      </Stack>
      <Stack justifyContent={"flex-end"} direction={"row"} gap={2}>
        {plans.map((plan, index) => (
          <>
            <Stack sx={{ py: 2, width: "calc(225px - 34px)", "&:last-child": { width: "calc(225px - 15px)" } }}>
              <Button fullWidth key={plan}>
                Choose Plan
              </Button>
            </Stack>
            {index + 1 !== plans.length && <Divider flexItem orientation="horizontal" sx={{ borderWidth: "1px" }} />}
          </>
        ))}
      </Stack>
    </Stack>
  );
};

export default PricingTable;
