import { Box, Button, Stack, Typography } from "@mui/material";

const Head = () => {
  return (
    <Stack
      justifyContent={"space-between"}
      alignItems={"flex-start"}
      gap={3}
      sx={{ p: 3, position: "absolute", width: "100%" }}
    >
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} sx={{ width: "100%" }}>
        <Button color="info" sx={{ zIndex: 3 }}>
          How It Works
        </Button>
        <Button color="info" sx={{ zIndex: 3 }}>
          See The Rules
        </Button>
      </Stack>
      <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ zIndex: 3 }}>
        <Typography variant="p2-medium" color={"grey.light"}>
          Today's tries left :
        </Typography>
        <Box sx={{ px: 1, bgcolor: "dark.3", borderRadius: "6px" }}>
          <Typography color={"blue.light"}>3</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
export default Head;
