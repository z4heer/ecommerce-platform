import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
    ConfirmationDialogComponent
} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

import {
    ConfirmationDialogOptions
} from '../models/dialog.model';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    private readonly dialog = inject(MatDialog);

    confirm(
        options: ConfirmationDialogOptions
    ): Observable<boolean> {

        const dialogRef = this.dialog.open(
            ConfirmationDialogComponent,
            {
                width: '420px',
                disableClose: options.disableClose ?? true,
                data: {
                    title: options.title,
                    message: options.message,
                    confirmText: options.confirmText ?? 'Confirm',
                    cancelText: options.cancelText ?? 'Cancel',
                    confirmColor: options.confirmColor ?? 'primary'
                }
            }
        );

        return dialogRef.afterClosed();
    }
}