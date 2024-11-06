import { Stack, Typography } from "@mui/material";
type Props = {
  title: string;
  description: string;
};
const Summary = ({ title, description }: Props) => {
  return (
    <Stack spacing={1}>
      <Typography variant="p1-semi-bold">{title}</Typography>
      <Typography variant="p2-regular" color={"grey.light"}>
        {description}
      </Typography>
    </Stack>
  );
};

export default Summary;
