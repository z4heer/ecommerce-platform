export interface ConfirmationDialogData {
  title: string;
  message: string;
  severity?: 'default' | 'info' | 'warning' | 'danger';
  confirmLabel?: string;
  cancelLabel?: string;
  icon?: string;
  disableClose?: boolean;
}
