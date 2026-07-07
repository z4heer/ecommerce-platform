import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs';

export type SidenavMode = 'side' | 'over';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {
    effect(() => {
      if (this.desktop()) {
        this._opened.set(true);
        return;
      }
      this._opened.set(false);
    });
  }

  private readonly breakpointObserver = inject(BreakpointObserver);

  /**
   * ----------------------------------------------------
   * Breakpoint Signals
   * ----------------------------------------------------
   */

  readonly handset = toSignal(
    this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)),

    { initialValue: false },
  );

  readonly tablet = toSignal(
    this.breakpointObserver.observe(Breakpoints.Tablet).pipe(map(result => result.matches)),

    { initialValue: false },
  );

  /**
   * ----------------------------------------------------
   * Drawer State
   * ----------------------------------------------------
   */

  private readonly _opened = signal(true);

  readonly opened = this._opened.asReadonly();

  /**
   * ----------------------------------------------------
   * Responsive Mode
   * ----------------------------------------------------
   */

  readonly mode = computed<SidenavMode>(() => {
    if (this.handset()) {
      return 'over';
    }

    return 'side';
  });

  /**
   * ----------------------------------------------------
   * Desktop
   * ----------------------------------------------------
   */

  readonly desktop = computed(() => {
    return !this.handset() && !this.tablet();
  });

  /**
   * ----------------------------------------------------
   * Should drawer stay open?
   * ----------------------------------------------------
   */

  readonly shouldOpen = computed(() => {
    if (this.desktop()) {
      return true;
    }

    return this.opened();
  });

  /**
   * ----------------------------------------------------
   * Public API
   * ----------------------------------------------------
   */

  toggle(): void {
    if (this.desktop()) {
      return;
    }

    this._opened.update(v => !v);
  }

  open(): void {
    this._opened.set(true);
  }

  close(): void {
    this._opened.set(false);
  }
}
