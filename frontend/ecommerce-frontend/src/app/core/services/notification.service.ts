import { Injectable, inject } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarConfig
} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private readonly snackBar = inject(MatSnackBar);

    private readonly defaultConfig: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
    };

    success(
        message: string,
        action = 'OK'
    ): void {

        this.open(message, action, ['snackbar-success']);
    }

    error(
        message: string,
        action = 'Dismiss'
    ): void {

        this.open(
            message,
            action,
            ['snackbar-error'],
            5000
        );
    }

    warning(
        message: string,
        action = 'OK'
    ): void {

        this.open(
            message,
            action,
            ['snackbar-warning']
        );
    }

    info(
        message: string,
        action = 'OK'
    ): void {

        this.open(
            message,
            action,
            ['snackbar-info']
        );
    }

    private open(
        message: string,
        action: string,
        panelClass: string[],
        duration = this.defaultConfig.duration!
    ): void {

        this.snackBar.open(message, action, {
            ...this.defaultConfig,
            duration,
            panelClass
        });
    }
}