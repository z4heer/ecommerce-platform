import { Directive } from '@angular/core';

@Directive({
  selector: '[appEmptyActions], [empty-actions]',
  standalone: true,
})
export class EmptyActionsDirective {}
