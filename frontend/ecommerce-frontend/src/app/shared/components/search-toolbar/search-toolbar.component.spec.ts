import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchToolbarComponent } from './search-toolbar.component';
import { SearchToolbarFiltersDirective } from './search-toolbar-filters.directive';
import { SearchToolbarActionsDirective } from './search-toolbar-actions.directive';

@Component({
  template: `
    <app-search-toolbar>
      <div toolbar-filters class="test-filter">Filter Element</div>
      <div toolbar-actions class="test-action">Action Element</div>
    </app-search-toolbar>
  `,
  standalone: true,
  imports: [SearchToolbarComponent, SearchToolbarFiltersDirective, SearchToolbarActionsDirective]
})
class TestHostComponent { }

describe('SearchToolbarComponent', () => {
  let component: SearchToolbarComponent;
  let fixture: ComponentFixture<SearchToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchToolbarComponent, NoopAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should successfully compile and create the component baseline', () => {
    expect(component).toBeTruthy();
  });

  it('should cleanly apply fallback default placeholder strings', () => {
    const inputEl = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(inputEl.placeholder).toBe('Search...');
  });

  it('should suppress duplicate sequential values and emit clean debounced text alterations', fakeAsync(() => {
    const searchChangeSpy = jasmine.createSpy('searchChangeSpy');
    fixture.componentRef.setInput('debounceTime', 200);
    component.searchChange.subscribe(searchChangeSpy);

    const inputEl = fixture.debugElement.query(By.css('input'));

    inputEl.nativeElement.value = 'Enterprise';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick(100);
    expect(searchChangeSpy).not.toHaveBeenCalled();

    tick(100);
    expect(searchChangeSpy).toHaveBeenCalledWith('Enterprise');
    expect(searchChangeSpy).toHaveBeenCalledTimes(1);

    // Enter duplicate entry
    inputEl.nativeElement.value = 'Enterprise';
    inputEl.nativeElement.dispatchEvent(new Event('input'));
    tick(250);
    expect(searchChangeSpy).toHaveBeenCalledTimes(1); // Blocked duplicate stream emission
  }));

  it('should trigger explicit searchSubmit notifications on Keyboard Enter event updates', () => {
    const searchSubmitSpy = jasmine.createSpy('searchSubmitSpy');
    component.searchSubmit.subscribe(searchSubmitSpy);

    component.searchControl.setValue('Execute Production Run');
    const inputEl = fixture.debugElement.query(By.css('input'));

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    inputEl.nativeElement.dispatchEvent(enterEvent);

    expect(searchSubmitSpy).toHaveBeenCalledWith('Execute Production Run');
  });

  it('should clear data states and fire functional callbacks upon clean interaction updates', () => {
    const searchChangeSpy = jasmine.createSpy('searchChangeSpy');
    const clearSearchSpy = jasmine.createSpy('clearSearchSpy');
    component.searchChange.subscribe(searchChangeSpy);
    component.clearSearch.subscribe(clearSearchSpy);

    component.searchControl.setValue('Discard context criteria');
    fixture.detectChanges();

    component.clear();

    expect(component.searchControl.value).toBe('');
    expect(clearSearchSpy).toHaveBeenCalled();
    expect(searchChangeSpy).toHaveBeenCalledWith('');
  });

  it('should respect explicit application layout loading indicators structural changes', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });

  it('should completely support projection points via specialized structural elements', () => {
    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const projectedFilter = hostFixture.debugElement.query(By.css('.test-filter'));
    const projectedAction = hostFixture.debugElement.query(By.css('.test-action'));

    expect(projectedFilter).toBeTruthy();
    expect(projectedAction).toBeTruthy();
  });
});