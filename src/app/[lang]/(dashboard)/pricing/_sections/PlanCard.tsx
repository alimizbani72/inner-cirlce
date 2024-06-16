import RiveComp from "@/components/RiveComp";
import { fCurrency } from "@/utils/format-number";
import { Box, Button, Stack, Typography } from "@mui/material";
import type { FC } from "react";

type Props = {
  title: string;
  image: string;
  description: string;
  cost: string;
  onClick: VoidFunction;
};

const PlanCard: FC<Props> = ({ title, image, description, cost, onClick }) => {
  return (
    <Stack
      height={500}
      minWidth={264}
      flex={1}
      border={"1px solid"}
      borderColor={"dark.3"}
      bgcolor={"dark.2"}
      borderRadius={2}
    >
      <Box width={264} height={264} p={4} borderBottom={"1px solid"} borderColor={"dark.3"}>
        <RiveComp src={image} width={200} height={200} />
      </Box>
      <Stack p={2} gap={2}>
        <Typography mb={-1} variant="p1-semi-bold" color="pink.light">
          {title}
        </Typography>
        <Typography variant="p2-medium">{description}</Typography>
        <Typography variant="h3-semi-bold">{fCurrency(cost, "$0,0[.]00")?.replace("$", "€")}</Typography>
        <Button onClick={onClick}>Choose Plan</Button>
      </Stack>
    </Stack>
  );
};

export default PlanCard;
