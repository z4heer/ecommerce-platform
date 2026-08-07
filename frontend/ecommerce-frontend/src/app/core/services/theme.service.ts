import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme-preference';

  readonly currentTheme = signal<ThemeMode>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
    });
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.currentTheme.set(nextTheme);
    localStorage.setItem(this.THEME_KEY, nextTheme);
  }

  setTheme(theme: ThemeMode): void {
    this.currentTheme.set(theme);
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as ThemeMode | null;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeMode): void {
    const root = document.documentElement;
    const body = document.body;

    if (theme === 'dark') {
      root.classList.add('dark-theme');
      body.classList.add('dark-theme');
      root.classList.remove('light-theme');
      body.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      body.classList.add('light-theme');
      root.classList.remove('dark-theme');
      body.classList.remove('dark-theme');
    }
  }
}
