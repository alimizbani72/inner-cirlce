import type { PopoverProps } from '@mui/material/Popover';

// ----------------------------------------------------------------------

export type PopoverArrow =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom';

export type UsePopoverReturn = {
  open: HTMLElement | null;
  anchorEl: PopoverProps['anchorEl'];
  onClose: () => void;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<PopoverProps['anchorEl']>>;
};

export interface MenuPopoverProps extends Omit<PopoverProps, 'open'> {
  open: HTMLElement | null;
  arrow?: PopoverArrow;
  hiddenArrow?: boolean;
}
