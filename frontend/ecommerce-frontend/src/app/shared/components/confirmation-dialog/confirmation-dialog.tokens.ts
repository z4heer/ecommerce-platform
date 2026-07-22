import { ConfirmationDialogData } from './confirmation-dialog.models';

export const DEFAULT_CONFIRMATION_DIALOG_CONFIG: Required<
  Omit<ConfirmationDialogData, 'title' | 'message' | 'icon'>
> = {
  severity: 'default',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  disableClose: false,
};
