"use client";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type React from "react";
import type { FC } from "react";

interface ToggleProps {
  value?: any;
  buttons: { label: React.ReactNode; value: any }[];
  setValue: (value: any) => void;
}

const Toggle: FC<ToggleProps> = ({ value, buttons, setValue }) => {
  const handleChange = (_event: any, newValue: any) => {
    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <ToggleButtonGroup value={value} onChange={handleChange}>
      {buttons.map((button) => (
        <ToggleButton sx={{ whiteSpace: "nowrap" }} key={button.value} value={button.value}>
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default Toggle;
