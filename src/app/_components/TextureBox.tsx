import { Box } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

const TextureBox: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, #779DFF 0%, #565CE4 100%)",
          position: "absolute",
          width: "100%",
          height: "100vh",
          zIndex: 0,
        }}
      >
        <img
          src="/assets/png/registerFrame.png"
          style={{ width: "100%", height: "100%", position: "absolute", objectFit: "cover" }}
        />
        {/* <img
          src="/assets/png/flare.png"
          style={{ width: "100%", height: "100vh", position: "absolute", opacity: 0.06, objectFit: "contain" }}
        />
        <img
          src="/assets/png/texture.png"
          style={{ width: "100%", height: "100vh", position: "absolute", opacity: 0.04, objectFit: "cover" }}
        /> */}
      </Box>
      <Box sx={{ position: "relative" }}>{children}</Box>
    </Box>
  );
};
export default TextureBox;
