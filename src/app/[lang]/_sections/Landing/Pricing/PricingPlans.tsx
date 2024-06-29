import type { FC } from "react";
import SectionTitle from "../SectionTitle";
import LandingContainer from "../LandingContainer";
import Scrollbar from "@/components/Scrollbar";
import RiveComp from "@/components/RiveComp";
import { fCurrency } from "@/utils/format-number";
import { isOdd } from "@/utils/toNumber";
import { Box, Button, Typography, Stack } from "@mui/material";

import BlurTexture from "./BlurTexture";
import { useRouter } from "next/navigation";

interface PricingPlansProps {
  plans: { id: string; title: string; image: string; description: string; cost: number; onClick: VoidFunction }[];
}

const PricingPlans: FC<PricingPlansProps> = ({ plans }) => {
  const { push } = useRouter();
  return (
    <LandingContainer gap={{ md: 6, xs: 4 }} alignItems={"center"}>
      <SectionTitle
        title="Pricing"
        bigTypoColor="rgba(255, 255, 255, 0.02)"
        color="white"
        firsLetterColor="pink.dark"
      />

      <Scrollbar options={{ scrollbars: { autoHide: "never" } }}>
        <Stack maxWidth={"100vw"}>
          <Stack px={3} width={"fit-content"} height={610} pb={2} justifyContent="center">
            <Stack
              direction={"row"}
              border="1.5px solid"
              borderColor="dark.3"
              borderRadius={2}
              sx={{
                "> div:first-child": { borderTopLeftRadius: 16, borderBottomLeftRadius: 16 },
                "> div:last-child": {
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    top: -32,
                    bottom: -32,
                    left: 0,
                    right: 0,
                    borderRadius: 2,
                    border: "2px solid",
                    borderColor: "pink.dark",
                  },
                },
              }}
            >
              {plans.map((plan, index) => (
                <Stack key={plan.title} bgcolor={isOdd(index) ? "dark.2" : "dark.3"} position={"relative"}>
                  {index + 1 === plans.length && (
                    <Box
                      width="100%"
                      position={"absolute"}
                      sx={{ top: -32, bottom: -32, left: 0, right: 0, zIndex: 1, borderRadius: 2 }}
                      overflow={"hidden"}
                    >
                      <BlurTexture />
                    </Box>
                  )}

                  <Stack
                    p={1}
                    width={232}
                    height={232}
                    alignItems="center"
                    justifyContent="center"
                    position={"relative"}
                    zIndex={5}
                  >
                    <RiveComp width={175} height={175} src={plan.image} />
                  </Stack>
                  <Stack gap={3} p={3} position={"relative"} zIndex={5}>
                    <Stack gap={2}>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="p1-semi-bold" color="pink.light" textTransform={"capitalize"}>
                          {plan.title}
                        </Typography>

                        {index + 1 === plans.length && (
                          <Stack
                            sx={{
                              width: 90,
                              height: 24,
                              borderRadius: 1.5,
                              background: (theme) => theme.palette.gradient.orange,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography textTransform="uppercase" color="dark.1" variant="caption-semi-bold">
                              Popular
                            </Typography>
                          </Stack>
                        )}
                      </Stack>
                      <Typography variant="p2-medium" color="white">
                        {plan.description}
                      </Typography>
                    </Stack>
                    <Typography variant="h3-semi-bold">
                      {plan.cost ? fCurrency(plan.cost, "$0,0[.]00")?.replace("$", "€") : "FREE"}
                    </Typography>
                    <Button onClick={() => push("/pricing")}>Get Started</Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Scrollbar>
    </LandingContainer>
  );
};

export default PricingPlans;
