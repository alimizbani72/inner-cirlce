"use client";

import { useRive, RuntimeLoader, useStateMachineInput } from "@rive-app/react-canvas";
import { type FC, useEffect } from "react";

RuntimeLoader.setWasmUrl("/assets/rive.wasm");

type RiveCompProps = {
  src: string;
  height?: number;
  width?: number;
  stateMachineName?: string;
  inputName?: string;
  onInputReady?: (input: any) => void;
};

const RiveComp: FC<RiveCompProps> = ({
  src,
  height,
  width,
  stateMachineName = "State Machine 1",
  inputName = "",
  onInputReady,
}) => {
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachineName,
    autoplay: true,
  });

  const input = useStateMachineInput(rive, stateMachineName, inputName);

  useEffect(() => {
    if (input && onInputReady) {
      onInputReady(input);
    }
  }, [input, onInputReady]);

  return <RiveComponent style={{ width: width ?? "100%", height: height ?? "100%" }} />;
};

export default RiveComp;
