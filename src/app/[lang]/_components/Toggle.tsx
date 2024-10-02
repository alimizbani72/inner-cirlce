"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type React from "react";
import type { FC } from "react";

interface ToggleProps {
  value?: any;
  buttons: { label: React.ReactNode; value: any }[];
  setValue: (value: any) => void;
  width?: string;
  size?: "small" | "large" | "medium";
}

const Toggle: FC<ToggleProps> = ({ value, buttons, setValue, width, size }) => {
  const handleChange = (_event: any, newValue: any) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <ToggleButtonGroup value={value} sx={{ width: width }} size={size} onChange={handleChange}>
      {buttons.map((button) => (
        <ToggleButton sx={{ whiteSpace: "nowrap", width: width }} key={button.value} value={button.value}>
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Toggle;
