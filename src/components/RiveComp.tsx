"use client";
import { useRive, RuntimeLoader } from "@rive-app/react-canvas";

RuntimeLoader.setWasmUrl("/assets/rive.wasm");
import type { FC } from "react";

type RiveCompProps = {
  src: string;
  height: number;
  width: number;
};

const RiveComp: FC<RiveCompProps> = ({ src, height, width }) => {
  const { RiveComponent } = useRive({
    src,
    stateMachines: "State Machine 1",
    autoplay: true,
  });

  return <RiveComponent style={{ width, height }} />;
};
export default RiveComp;
