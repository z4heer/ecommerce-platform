import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnvironmentCheckComponent } from './environment-check.component';
import { of } from 'rxjs';
import { EnvironmentService } from '../../../core/services/environment.service';

describe('EnvironmentCheckComponent', () => {
  let component: EnvironmentCheckComponent;
  let fixture: ComponentFixture<EnvironmentCheckComponent>;
  const environmentServiceMock = {
    check: () =>
      of({
        api: 'UP',
        postgres: 'UP',
        redis: 'UP'
      })
  };
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [EnvironmentCheckComponent],
      providers: [
        {
          provide: EnvironmentService,
          useValue: environmentServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnvironmentCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
