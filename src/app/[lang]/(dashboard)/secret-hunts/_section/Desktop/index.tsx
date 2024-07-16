import { Box, Stack, Typography } from "@mui/material";
import Head from "./Head";
import RiveComp from "@/components/RiveComp";
import CustomInput from "./CustomInput";
import Image from "@/components/Image";
import IconGrid from "./IconGrid";

const SecretHuntsDesktop = () => {
  return (
    <Stack sx={{ position: "relative", height: "100%" }}>
      <Head />

      <Stack
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={6}
        sx={{ position: "relative", zIndex: 1, height: "100%", pb: 6 }}
      >
        <Box sx={{ height: "100%", width: "100%" }}>
          <Box sx={{ position: "absolute", width: "100%", height: "58%" }}>
            <RiveComp src="/assets/rive/Ballon_Hunting.riv" />
          </Box>
          <Box sx={{ position: "absolute", width: "100%", height: "58%", zIndex: -1 }}>
            <RiveComp src="/assets/rive/Stars.riv" />
          </Box>
        </Box>
        <Stack justifyContent={"center"} alignItems={"center"} sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h2-regular">Find the hidden keyworks & Earn</Typography>
          <RiveComp src="/assets/rive/BTC_shining.riv" width={147} height={52} />
        </Stack>

        <Stack direction={"row"} alignItems={"center"} sx={{ position: "relative", width: "100%", mb: 7 }}>
          <Image src="/assets/svg/Left Words.svg" sx={{ width: "100%" }} />
          <CustomInput />
          <Image src="/assets/svg/Right Words.svg" sx={{ width: "100%" }} />
        </Stack>
        <IconGrid activeNumber={1} />
      </Stack>
    </Stack>
  );
};
export default SecretHuntsDesktop;
