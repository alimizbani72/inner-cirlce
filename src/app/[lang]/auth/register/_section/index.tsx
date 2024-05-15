"use client";
import { Stack } from "@mui/material";
import type { FC } from "react";
import Register from "./Register";

const RegisterSection: FC = () => {
  return (
    <Stack sx={{ height: "100%", width: "100%" }} alignItems={"center"} justifyContent={"center"}>
      <Stack sx={{ width: "100%", maxWidth: "456px" }} justifyContent={"center"} spacing={4}>
        <Register />
      </Stack>
    </Stack>
  );
};
export default RegisterSection;
