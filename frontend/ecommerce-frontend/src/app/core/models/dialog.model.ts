export interface ConfirmationDialogOptions {

    title: string;

    message: string;

    confirmText?: string;

    cancelText?: string;

    confirmColor?: 'primary' | 'accent' | 'warn';

    disableClose?: boolean;
}