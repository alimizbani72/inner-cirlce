import { useIsMobile } from "@/hooks/use-responsive";
import { Box, type BoxProps, ClickAwayListener, Stack, Tooltip } from "@mui/material";
import { useState, type PropsWithChildren } from "react";
type Props = {
  title: string;
  sx?: BoxProps["sx"];
} & PropsWithChildren;
const CustomTooltip = ({ title, sx, children }: Props) => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Stack>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <Tooltip
          title={title}
          arrow
          placement="top"
          open={open}
          disableFocusListener={isMobile}
          disableHoverListener={isMobile}
          disableTouchListener={!isMobile}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "dark.3",
                color: "white",
                px: 1.5,
                borderRadius: 2,
                fontSize: (theme) => theme.typography["caption-semi-bold"],
              },
            },
            arrow: {
              sx: {
                color: "dark.3",
              },
            },
          }}
        >
          <Box
            onClick={isMobile ? handleTooltipOpen : undefined}
            onMouseEnter={!isMobile ? handleTooltipOpen : undefined}
            onMouseLeave={!isMobile ? handleTooltipClose : undefined}
            sx={{
              cursor: "pointer",
              color: "white",
              ...sx,
            }}
          >
            {children}
          </Box>
        </Tooltip>
      </ClickAwayListener>
    </Stack>
  );
};
export default CustomTooltip;
