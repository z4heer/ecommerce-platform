import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { ConfirmationDialogData } from './confirmation-dialog.models';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  const initializeComponent = (dialogData: ConfirmationDialogData | null) => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ConfirmationDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
      ],
    });

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should compile and construct correctly within an application context', () => {
    initializeComponent({ title: 'Test', message: 'Message' });
    expect(component).toBeTruthy();
  });

  it('should visually bind title and message expressions explicitly inside template structural markup', () => {
    initializeComponent({
      title: 'System Deletion',
      message: 'Confirm permanent sweep operations',
    });

    const titleEl = fixture.debugElement.query(
      By.css('#dialog-title-id .title-text'),
    ).nativeElement;
    const msgEl = fixture.debugElement.query(By.css('#dialog-desc-id .message-text')).nativeElement;

    expect(titleEl.textContent).toContain('System Deletion');
    expect(msgEl.textContent).toContain('Confirm permanent sweep operations');
  });

  it('should fallback securely to calculated default labels when options are omitted', () => {
    initializeComponent({ title: 'Test', message: 'Msg' });

    const cancelBtn = fixture.debugElement.query(By.css('.btn-cancel')).nativeElement;
    const confirmBtn = fixture.debugElement.query(By.css('.btn-confirm')).nativeElement;

    expect(cancelBtn.textContent.trim()).toBe('Cancel');
    expect(confirmBtn.textContent.trim()).toBe('Confirm');
  });

  it('should correctly adapt structural display markers matching customized functional overrides', () => {
    initializeComponent({
      title: 'Kill Task',
      message: 'Run',
      confirmLabel: 'Execute',
      cancelLabel: 'Halt',
    });

    const cancelBtn = fixture.debugElement.query(By.css('.btn-cancel')).nativeElement;
    const confirmBtn = fixture.debugElement.query(By.css('.btn-confirm')).nativeElement;

    expect(cancelBtn.textContent.trim()).toBe('Halt');
    expect(confirmBtn.textContent.trim()).toBe('Execute');
  });

  it('should assign explicit severity design classes mapped accurately matching payload configs', () => {
    initializeComponent({ title: 'T', message: 'M', severity: 'danger' });
    const fallbackBox = fixture.debugElement.query(By.css('.dialog-container')).nativeElement;
    expect(fallbackBox.className).toContain('severity-danger');
  });

  it('should pick structural system icon tokens matching discrete severity layers automatically', () => {
    initializeComponent({ title: 'T', message: 'M', severity: 'danger' });
    const iconEl = fixture.debugElement.query(By.css('.header-icon')).nativeElement;
    expect(iconEl.textContent.trim()).toBe('delete_forever');
  });

  it('should prefer custom defined icon tokens over automatic fallback definitions', () => {
    initializeComponent({ title: 'T', message: 'M', severity: 'danger', icon: 'settings' });
    const iconEl = fixture.debugElement.query(By.css('.header-icon')).nativeElement;
    expect(iconEl.textContent.trim()).toBe('settings');
  });

  it('should forward structural true assertions out upon positive confirm execution clicks', () => {
    initializeComponent({ title: 'T', message: 'M' });
    const confirmBtn = fixture.debugElement.query(By.css('.btn-confirm'));
    confirmBtn.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should forward structural false assertions out upon cancellation clicks', () => {
    initializeComponent({ title: 'T', message: 'M' });
    const cancelBtn = fixture.debugElement.query(By.css('.btn-cancel'));
    cancelBtn.triggerEventHandler('click', null);
    expect(mockDialogRef.close).toHaveBeenCalledWith(false);
  });

  it('should apply screen reader accessible labels explicitly via template settings', () => {
    initializeComponent({ title: 'Accessible Title', message: 'Msg' });
    const element = fixture.debugElement.query(By.css('.dialog-container')).nativeElement;
    expect(element.getAttribute('aria-labelledby')).toBe('dialog-title-id');
  });
});
