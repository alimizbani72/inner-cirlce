import { Stack, Typography } from "@mui/material";

const Allocation = () => {
  return (
    <Stack
      width={{ md: "50%", xs: "100%" }}
      height={"320px"}
      sx={{ border: "1px solid", borderColor: "dark.3", borderRadius: 2 }}
      textAlign={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Typography>Allocation Section</Typography>
    </Stack>
  );
};

export default Allocation;
