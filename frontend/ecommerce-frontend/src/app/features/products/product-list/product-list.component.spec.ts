// product-list.component.spec.ts
// Updated for CartService-only Add to Cart flow.

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../../cart/services/cart.service';
import { Product } from '../../../core/models/product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let router: jasmine.SpyObj<Router>;
  let cartService: jasmine.SpyObj<CartService>;

  const mockQuerySignal = signal<{
    data: Product[];
    loading: boolean;
    error: any;
  }>({
    data: [{
      id: '1',
      name: 'Aligned Item',
      description: 'Enterprise Product',
      category: 'Gadgets',
      price: 99.99,
      stock_quantity: 10,
      status: 'In Stock',
      imageUrl: ''
    }],
    loading: false,
    error: null
  });

  beforeEach(async () => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    cartService = jasmine.createSpyObj('CartService', ['addToCart']);

    const productServiceMock = {
      productsQuery: mockQuerySignal,
      getProducts: jasmine.createSpy('getProducts').and.returnValue(of([]))
    };

    await TestBed.configureTestingModule({
      imports: [
        ProductListComponent,
        MatDialogModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: router },
        { provide: CartService, useValue: cartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page container', () => {
    expect(
      fixture.debugElement.query(By.css('app-page-container'))
    ).toBeTruthy();
  });

  it('should navigate to product detail', () => {
    component.navigateToDetail('1');
    expect(router.navigate).toHaveBeenCalledWith(['/products', '1']);
  });

  it('should add product to cart', () => {
    const product = mockQuerySignal().data[0];
    component.onAddToCart(product);
    expect(cartService.addToCart).toHaveBeenCalledOnceWith(product);
  });

  it('should filter products by search term', () => {
    component.onSearch('aligned');
    expect(component.filteredProducts().length).toBe(1);

    component.onSearch('xyz');
    expect(component.filteredProducts().length).toBe(0);
  });

  it('should filter products by category', () => {
    component.onCategorySelect('Gadgets');
    expect(component.filteredProducts().length).toBe(1);

    component.onCategorySelect('Other');
    expect(component.filteredProducts().length).toBe(0);
  });

  it('should resolve status correctly', () => {
    expect(component.resolveStatusLabel('In Stock')).toBe('In Stock');
    expect(component.resolveStatusLabel('Unknown')).toBe('Not Available');
    expect(component.resolveStatusLabel(undefined)).toBe('Not Available');
  });
});