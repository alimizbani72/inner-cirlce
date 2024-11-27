import { snipText } from "@/utils/string";
import { Stack, Typography } from "@mui/material";
type Props = {
  title: string;
  description: string | undefined;
};
const Summary = ({ title, description }: Props) => {
  return (
    <Stack spacing={1}>
      <Typography variant="p1-semi-bold">{title}</Typography>
      <Typography variant="p2-regular" color={"grey.light"} sx={{ ...snipText(100) }}>
        {description}
      </Typography>
    </Stack>
  );
};

export default Summary;
