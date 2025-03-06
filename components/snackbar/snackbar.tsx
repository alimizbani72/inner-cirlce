'use client';

import Portal from '@mui/material/Portal';

import Icon from '../icon';
import { toasterClasses } from './classes';
import { StyledToaster } from './styles';

// ----------------------------------------------------------------------

export function Snackbar() {
  return (
    <Portal>
      <StyledToaster
        expand
        gap={12}
        closeButton
        offset={16}
        visibleToasts={4}
        position="top-center"
        className={toasterClasses.root}
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: toasterClasses.toast,
            icon: toasterClasses.icon,
            // content
            content: toasterClasses.content,
            title: toasterClasses.title,
            description: toasterClasses.description,
            // button
            actionButton: toasterClasses.actionButton,
            cancelButton: toasterClasses.cancelButton,
            closeButton: toasterClasses.closeButton,
            // state
            default: toasterClasses.default,
            info: toasterClasses.info,
            error: toasterClasses.error,
            success: toasterClasses.success,
            warning: toasterClasses.warning,
          },
        }}
        icons={{
          loading: <span className={toasterClasses.loadingIcon} />,
          info: <Icon name="InfoIcon" />,
          success: <Icon name="CheckCircleIcon" />,
          warning: <Icon name="WarningIcon" />,
          error: <Icon name="CloseIcon" />,
        }}
      />
    </Portal>
  );
}
