import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SectionHeaderComponent } from './section-header.component';
import { SectionActionsDirective } from './section-actions.directive';
import { SectionMetaDirective } from './section-meta.directive';

@Component({
  template: `
    <app-section-header [title]="titleText" [subtitle]="subtitleText" [showDivider]="dividerOpt">
      <div section-meta id="meta-content">Status: Active</div>
      <button section-actions id="action-btn">Edit</button>
    </app-section-header>
  `,
  imports: [SectionHeaderComponent, SectionActionsDirective, SectionMetaDirective],
  standalone: true
})
class TestHostComponent {
  titleText = 'Inventory';
  subtitleText = 'Stock Levels';
  dividerOpt = false;
}

describe('SectionHeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderComponent, TestHostComponent, SectionActionsDirective, SectionMetaDirective]
    }).compileComponents();
  });

  it('should compile and initialize cleanly', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'Main Specifications');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should cleanly display the primary dynamic title string', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'System Administration');
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.app-section-header__title')).nativeElement;
    expect(element.textContent).toContain('System Administration');
  });

  it('should conditionally handle missing or empty subtitle configurations', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'Minimal Workspace');
    fixture.detectChanges();

    const subtitleNode = fixture.debugElement.query(By.css('.app-section-header__subtitle'));
    expect(subtitleNode).toBeNull();
  });

  it('should project layout components via structural directives safely', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const metaNode = fixture.debugElement.query(By.css('#meta-content'));
    const actionNode = fixture.debugElement.query(By.css('#action-btn'));

    expect(metaNode.nativeElement.textContent).toContain('Status: Active');
    expect(actionNode.nativeElement.textContent).toContain('Edit');
  });

  it('should toggle conditional divider lines cleanly when requested', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.componentInstance.dividerOpt = true;
    fixture.detectChanges();

    const dividerElement = fixture.debugElement.query(By.css('mat-divider'));
    expect(dividerElement).not.toBeNull();
  });

  it('should correctly attach regional accessibility descriptions via aria labels', () => {
    const fixture = TestBed.createComponent(SectionHeaderComponent);
    fixture.componentRef.setInput('title', 'Aria Panel');
    fixture.componentRef.setInput('ariaLabel', 'Custom Accessibility Region Descriptor');
    fixture.detectChanges();

    const compiledElement = fixture.nativeElement.querySelector('.app-section-header');
    expect(compiledElement.getAttribute('aria-label')).toBe('Custom Accessibility Region Descriptor');
  });
});