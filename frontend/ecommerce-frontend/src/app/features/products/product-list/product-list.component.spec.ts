import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
productsQuery: signal('')
describe('ProductListComponent Integration Paths', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockQuerySignal = signal({
    data: [
      {
        id: '1',
        name: 'Aligned Item',
        description: 'Desc A',
        category: 'Gadgets',
        price: 99.99,
        status: 'In Stock' as const,
        imageUrl: '',
      },
    ],
    loading: false,
    error: null,
  });

  beforeEach(async () => {
    // ProductService exposes a "productsQuery" computed signal (not a method).  
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const productServiceMock = {
      productsQuery: mockQuerySignal,
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([])),
    };
    await TestBed.configureTestingModule({
      imports: [ProductListComponent, MatDialogModule],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should successfully match structural design system components via layout imports', () => {
    const container = fixture.debugElement.query(By.css('app-page-container'));
    expect(container).toBeTruthy();
  });
});
