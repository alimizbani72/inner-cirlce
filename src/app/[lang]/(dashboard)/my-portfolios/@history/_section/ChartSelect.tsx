"use client";
import type { Theme, SxProps } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";

import { Icon } from "@/components/icons";
import { Box, Divider, Stack, Typography } from "@mui/material";
import CustomMenu from "@/components/CustomMenu";
import { usePopover } from "@/components/custom-popover";

type Props = {
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
  slotProps?: {
    button?: SxProps<Theme>;
    popover?: SxProps<Theme>;
  };
};

export function ChartSelect({ options, value, onChange, slotProps, ...other }: Props) {
  const { onClose, onOpen, open } = usePopover();
  return (
    <>
      <ButtonBase
        onClick={onOpen}
        sx={{
          gap: 0.5,
          height: 32,
          borderRadius: 1,
          bgcolor: "dark.2",
          typography: "p2-semi-bold",
          color: open ? "white" : "grey.light",
          ...slotProps?.button,
        }}
        {...other}
      >
        {value}
        <Box sx={{ path: { stroke: (theme) => theme.palette.grey.light } }}>
          <Icon name={open ? "Arrow-up" : "Arrow-down"} />
        </Box>
      </ButtonBase>

      <CustomMenu anchorEl={open} open={!!open} onClose={onClose} width={174}>
        {options.map((option, index) => (
          <Stack key={option}>
            <MenuItem
              sx={{
                display: "flex",
              }}
              selected={option === value}
              onClick={() => {
                onClose();
                onChange(option);
              }}
            >
              <Stack flex={2}>
                <Typography variant="p2-medium" color={option === value ? "white" : "grey.light"}>
                  {option}
                </Typography>
              </Stack>
              {option === value && (
                <Stack>
                  <Box sx={{ path: { stroke: (theme) => theme.palette.pink.dark } }}>
                    <Icon name="Check" />
                  </Box>
                </Stack>
              )}
            </MenuItem>
            {index < options.length - 1 && <Divider />}
          </Stack>
        ))}
      </CustomMenu>
    </>
  );
}
