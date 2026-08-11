import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-container',
  standalone: true,
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {}
