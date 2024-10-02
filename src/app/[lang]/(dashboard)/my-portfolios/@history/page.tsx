import { Stack, Typography } from "@mui/material";

const History = () => {
  return (
    <Stack
      width={{ md: "50%", xs: "100%" }}
      height={"320px"}
      sx={{ border: "1px solid", borderColor: "dark.3", borderRadius: 2 }}
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography>History Section</Typography>
    </Stack>
  );
};

export default History;
