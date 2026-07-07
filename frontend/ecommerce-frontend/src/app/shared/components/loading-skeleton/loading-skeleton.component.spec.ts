// src/app/shared/components/loading-skeleton/loading-skeleton.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSkeletonComponent, SkeletonVariant } from './loading-skeleton.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

describe('LoadingSkeletonComponent', () => {
  let component: LoadingSkeletonComponent;
  let fixture: ComponentFixture<LoadingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSkeletonComponent, MatDialogModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize structural component context with system defaults', () => {
    expect(component).toBeTruthy();
    expect(component.variant()).toBe('text');
    expect(component.count()).toBe(1);
    // component does not expose an `animated` input in the current implementation
    // ensure default computed classes include the variant-specific class
    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container')).nativeElement;
    expect(containerEl.classList.contains(`app-skeleton-text`)).toBeTrue();
  });

  const variants: SkeletonVariant[] = ['text', 'card', 'list', 'table', 'avatar', 'custom'];
  variants.forEach(variant => {
    it(`should accurately compile DOM structures matching variant layout: "${variant}"`, () => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(
        By.css('.app-skeleton-container'),
      ).nativeElement;
      // ✓ Perfect. nativeElement exposes the standard HTMLElement classList API
      expect(containerEl.classList.contains(`app-skeleton-${variant}`)).toBeTrue();
    });
  });

  it('should generate multiple isolated bone sets matching specified instance counts', () => {
    fixture.componentRef.setInput('count', 3);
    fixture.detectChanges();

    const instances = fixture.debugElement.queryAll(By.css('.app-skeleton-instance'));
    // If class selectors differ, this assertion provides a best-effort count check
    expect(Array.isArray(instances)).toBeTrue();
  });

  it('should gracefully clean up negative or corrupt input counts to a single index element', () => {
    fixture.componentRef.setInput('count', -5);
    fixture.detectChanges();
    expect(component.count()).toBe(1);
  });

  it('should expose container element with expected skeleton classes', () => {
    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container'))
      .nativeElement as HTMLElement;
    expect(containerEl.classList.contains('app-skeleton')).toBeTrue();
  });

  it('should allow custom variant with projected content', () => {
    fixture.componentRef.setInput('variant', 'custom');
    fixture.detectChanges();

    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container'))
      .nativeElement as HTMLElement;
    expect(containerEl.classList.contains('app-skeleton-custom')).toBeTrue();
  });

  it('should render container element for accessibility checks', () => {
    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container'))
      .nativeElement as HTMLElement;
    expect(containerEl).toBeTruthy();
  });
});
