import {
  Component,
  Inject,
  Optional,
  ChangeDetectionStrategy,
  input,
  computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogData } from './confirmation-dialog.models';
import { DEFAULT_CONFIRMATION_DIALOG_CONFIG } from './confirmation-dialog.tokens';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>, { optional: true });
  private readonly dialogData = inject<ConfirmationDialogData>(MAT_DIALOG_DATA, { optional: true });

  // Fallback and direct template standalone Signal Inputs
  readonly titleInput = input<string | undefined>(undefined, { alias: 'title' });
  readonly messageInput = input<string | undefined>(undefined, { alias: 'message' });
  readonly severityInput = input<'default' | 'info' | 'warning' | 'danger'>('default', { alias: 'severity' });
  readonly confirmLabelInput = input<string | undefined>(undefined, { alias: 'confirmLabel' });
  readonly cancelLabelInput = input<string | undefined>(undefined, { alias: 'cancelLabel' });
  readonly iconInput = input<string | undefined>(undefined, { alias: 'icon' });
  readonly disableCloseInput = input<boolean | undefined>(undefined, { alias: 'disableClose' });
  readonly ariaLabelInput = input<string | undefined>(undefined, { alias: 'ariaLabel' });

  // Unified Computed Processing Layer
  readonly dialogTitle = computed(() => this.dialogData?.title ?? this.titleInput() ?? '');
  readonly dialogMessage = computed(() => this.dialogData?.message ?? this.messageInput() ?? '');
  readonly dialogSeverity = computed(() => this.dialogData?.severity ?? this.severityInput() ?? DEFAULT_CONFIRMATION_DIALOG_CONFIG.severity);
  readonly confirmLabel = computed(() => this.dialogData?.confirmLabel ?? this.confirmLabelInput() ?? DEFAULT_CONFIRMATION_DIALOG_CONFIG.confirmLabel);
  readonly cancelLabel = computed(() => this.dialogData?.cancelLabel ?? this.cancelLabelInput() ?? DEFAULT_CONFIRMATION_DIALOG_CONFIG.cancelLabel);
  readonly disableClose = computed(() => this.dialogData?.disableClose ?? this.disableCloseInput() ?? DEFAULT_CONFIRMATION_DIALOG_CONFIG.disableClose);
  readonly ariaLabel = computed(() => this.ariaLabelInput() ?? this.dialogTitle());

  readonly displayIcon = computed(() => {
    if (this.dialogData?.icon) return this.dialogData.icon;
    if (this.iconInput()) return this.iconInput();

    switch (this.dialogSeverity()) {
      case 'info': return 'info';
      case 'warning': return 'warning';
      case 'danger': return 'delete_forever';
      case 'default':
      default:
        return 'help';
    }
  });

  constructor() {
    if (this.dialogRef) {
      // Lock keyboard backdrop escaping matching structural rules dynamically
      this.dialogRef.disableClose = this.disableClose();
    }
  }

  onConfirm(): void {
    if (this.dialogRef) {
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close(false);
    }
  }
}