import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NavigationItem } from '../models/navigation-item';
import { NAVIGATION_ITEMS } from '../layout.config';

@Component({
  selector: 'app-sidenav',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],

  templateUrl: './sidenav.component.html',

  styleUrls: ['./sidenav.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {

  /**
   * Current navigation configuration.
   * All future modules should be added in layout.config.ts
   */
  readonly navigationItems: NavigationItem[] = NAVIGATION_ITEMS;

  /**
   * Indicates whether the application is currently running
   * in mobile mode. Used by the template to optionally
   * adjust behaviour.
   */
  @Input()
  isMobile = false;

  /**
   * TrackBy improves rendering performance.
   */
  trackByRoute(
    index: number,
    item: NavigationItem
  ): string {
    return item.route;
  }

  /**
   * Returns true when menu item can navigate.
   */
  isEnabled(
    item: NavigationItem
  ): boolean {
    return item.enabled;
  }
}