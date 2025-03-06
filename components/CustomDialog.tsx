'use client';
import Icon from '@/components/icon';
import type { DialogProps } from '@mui/material';
import { Dialog, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import type { FC, PropsWithChildren } from 'react';

const CustomDialog: FC<PropsWithChildren<DialogProps & { count?: number }>> = ({
  title,
  count,
  children,
  onClose,
  ...props
}) => {
  return (
    <Dialog
      sx={(theme) => ({
        '& .MuiBackdrop-root': {
          backgroundColor: 'rgba(0, 0, 0, 0.64)',
        },
        '& .MuiDialogContent-root': {
          padding: `${theme.spacing(3)} !important`,
        },
        '& .MuiDialogActions-root': {
          borderTop: '1px solid',
          borderColor: 'dark.3',
          bgcolor: 'dark.1',
        },
        '& .MuiPaper-root': {
          boxShadow: 'none',
          bgcolor: 'dark.1',
          border: '1px solid',
          borderColor: 'dark.1',
        },
      })}
      aria-labelledby="customized-dialog-title"
      onClose={onClose}
      {...props}
    >
      {title && (
        <DialogTitle
          sx={(theme) => ({
            padding: theme.spacing(3),
            borderBottom: '1px solid',
            borderColor: 'dark.3',
          })}
        >
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h4-semi-bold">{title}</Typography>
              {count && (
                <Typography
                  sx={{
                    borderRadius: 3,
                    width: 20,
                    height: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  variant="caption-medium"
                >
                  {count}
                </Typography>
              )}
            </Stack>
            <IconButton onClick={onClose as any}>
              <Icon name="CloseIcon" />
            </IconButton>
          </Stack>
        </DialogTitle>
      )}

      {children}
    </Dialog>
  );
};

export default CustomDialog;
