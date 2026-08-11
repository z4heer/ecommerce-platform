import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, MatDialogModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the enterprise page layout and form structure', () => {
    const container = fixture.debugElement.nativeElement.querySelector('app-page-container');
    const header = fixture.debugElement.nativeElement.querySelector('app-page-header');
    const card = fixture.debugElement.nativeElement.querySelector('app-card');

    expect(container).toBeTruthy();
    expect(header).toBeTruthy();
    expect(card).toBeTruthy();
  });
});
