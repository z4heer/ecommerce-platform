// src/app/shared/components/loading-skeleton/loading-skeleton.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSkeletonComponent, SkeletonVariant } from './loading-skeleton.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('LoadingSkeletonComponent', () => {
  let component: LoadingSkeletonComponent;
  let fixture: ComponentFixture<LoadingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSkeletonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize structural component context with system defaults', () => {
    expect(component).toBeTruthy();
    expect(component.variant()).toBe('text');
    expect(component.count()).toBe(1);
    expect(component.animated()).toBe(true);
  });

  const variants: SkeletonVariant[] = ['text', 'card', 'list', 'table', 'avatar', 'custom'];
  variants.forEach(variant => {
    it(`should accurately compile DOM structures matching variant layout: "${variant}"`, () => {
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container')).nativeElement;
      // ✓ Perfect. nativeElement exposes the standard HTMLElement classList API
      expect(containerEl.classList.contains(`app-skeleton-${variant}`)).toBeTrue();
    });
  });

  it('should generate multiple isolated bone sets matching specified instance counts', () => {
    fixture.componentRef.setInput('count', 3);
    fixture.detectChanges();

    const instances = fixture.debugElement.queryAll(By.css('.app-skeleton-instance'));
    expect(instances.length).toBe(3);
  });

  it('should gracefully clean up negative or corrupt input counts to a single index element', () => {
    fixture.componentRef.setInput('count', -5);
    fixture.detectChanges();
    expect(component.count()).toBe(1);
  });

  it('should purge animation classes when motion is disabled via the animated input flag', () => {
    fixture.componentRef.setInput('animated', false);
    fixture.detectChanges();

    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container')).nativeElement;
    // ✓ Perfect. nativeElement exposes the standard HTMLElement classList API
    expect(containerEl.classList.contains(`app-skeleton-animated`)).toBeTrue();
  });

  it('should apply dense modifiers to the structural boundary host element wrapper', () => {
    fixture.componentRef.setInput('dense', true);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.classList.contains('app-skeleton-dense')).toBeTrue();
  });

  it('should inject explicit width and height stylings when custom configurations are specified', () => {
    fixture.componentRef.setInput('variant', 'custom');
    fixture.componentRef.setInput('width', '250px');
    fixture.componentRef.setInput('height', '80px');
    fixture.detectChanges();

    const containerEl = fixture.debugElement.query(By.css('.app-skeleton-container')).nativeElement as HTMLElement;
    expect(containerEl.style.width).toBe('250px');
    expect(containerEl.style.height).toBe('80px');
  });

  it('should output precise accessible attributes to satisfy WCAG 2.1 specifications', () => {
    const customLabel = 'Loading localized reporting module metrics';
    fixture.componentRef.setInput('ariaLabel', customLabel);
    fixture.detectChanges();

    const hostElement = fixture.nativeElement as HTMLElement;
    expect(hostElement.getAttribute('role')).toBe('status');
    expect(hostElement.getAttribute('aria-live')).toBe('polite');
    expect(hostElement.getAttribute('aria-busy')).toBe('true');
    expect(hostElement.getAttribute('aria-label')).toBe(customLabel);
  });
});