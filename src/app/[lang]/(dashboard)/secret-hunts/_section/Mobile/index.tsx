import { Box, Stack, Typography } from "@mui/material";
import Head from "./Head";
import RiveComp from "@/components/RiveComp";
import CustomInput from "./CustomInput";
import IconGrid from "./IconGrid";
const SecretHuntsMobile = () => {
  return (
    <Stack sx={{ position: "relative", height: "100vh" }}>
      <Head />

      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={6}
        sx={{ position: "relative", zIndex: 1, height: "100%", pb: 6, overflow: "hidden" }}
      >
        <Box sx={{ width: "100%", height: "460px" }}>
          <Box sx={{ position: "absolute", width: "200%", height: "50%", translate: "-25%" }}>
            <RiveComp src="/assets/rive/Ballon_Hunting.riv" />
          </Box>
          <Box sx={{ position: "absolute", width: "200%", height: "50%", translate: "-10%", zIndex: -1 }}>
            <RiveComp src="/assets/rive/Stars.riv" />
          </Box>
        </Box>
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ position: "relative", zIndex: 2, textAlign: "center" }}
        >
          <Typography variant="h2-regular">Find the hidden keyworks & Earn</Typography>
          <RiveComp src="/assets/rive/BTC_shining.riv" width={147} height={52} />
        </Stack>

        <Stack direction={"row"} alignItems={"center"} sx={{ position: "relative", width: "100%", mb: 7 }}>
          <CustomInput />
        </Stack>
        <IconGrid activeNumber={1} />
      </Stack>
    </Stack>
  );
};
export default SecretHuntsMobile;
