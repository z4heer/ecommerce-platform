import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CartComponent } from './cart.component';
import { CartService } from './services/cart.service';

import { CartItem } from '../../core/models/cart.model';

describe('CartComponent', () => {

  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let cartService: jasmine.SpyObj<CartService>;

  let cartItemsSignal: WritableSignal<CartItem[]>;
  let itemCountSignal: WritableSignal<number>;
  let uniqueItemCountSignal: WritableSignal<number>;
  let subtotalSignal: WritableSignal<number>;
  let estimatedTaxSignal: WritableSignal<number>;
  let grandTotalSignal: WritableSignal<number>;
  let isEmptySignal: WritableSignal<boolean>;

  beforeEach(async () => {

    // Fresh signals for every test
    cartItemsSignal = signal<CartItem[]>([
      {
        productId: 'P001',
        productName: 'MacBook Pro',
        productImageUrl: 'image.png',
        quantity: 2,
        unitPrice: 150000,
        stockQuantity: 5,
        status: 'In Stock',
        addedAt: new Date()
      }
    ]);

    itemCountSignal = signal(2);
    uniqueItemCountSignal = signal(1);
    subtotalSignal = signal(300000);
    estimatedTaxSignal = signal(24000);
    grandTotalSignal = signal(324000);
    isEmptySignal = signal(false);

    cartService = jasmine.createSpyObj<CartService>(
      'CartService',
      [
        'updateQuantity',
        'removeFromCart',
        'clearCart'
      ]
    );

    Object.defineProperties(cartService, {
      cartItems: {
        value: cartItemsSignal
      },
      itemCount: {
        value: itemCountSignal
      },
      uniqueItemCount: {
        value: uniqueItemCountSignal
      },
      subtotal: {
        value: subtotalSignal
      },
      estimatedTax: {
        value: estimatedTaxSignal
      },
      grandTotal: {
        value: grandTotalSignal
      },
      isEmpty: {
        value: isEmptySignal
      }
    });

    await TestBed.configureTestingModule({
      imports: [
        CartComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideRouter([]),
        {
          provide: CartService,
          useValue: cartService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose cart signals', () => {
    expect(component.cartItems().length).toBe(1);
    expect(component.itemCount()).toBe(2);
    expect(component.uniqueItemCount()).toBe(1);
    expect(component.subtotal()).toBe(300000);
    expect(component.estimatedTax()).toBe(24000);
    expect(component.grandTotal()).toBe(324000);
    expect(component.isEmpty()).toBeFalse();
  });

  it('should increase quantity', () => {

    const item = component.cartItems()[0];

    component.increaseQuantity(item);

    expect(cartService.updateQuantity)
      .toHaveBeenCalledOnceWith(
        item.productId,
        item.quantity + 1
      );
  });

  it('should decrease quantity', () => {

    const item = component.cartItems()[0];

    component.decreaseQuantity(item);

    expect(cartService.updateQuantity)
      .toHaveBeenCalledOnceWith(
        item.productId,
        item.quantity - 1
      );
  });

  it('should remove item', () => {

    component.removeItem('P001');

    expect(cartService.removeFromCart)
      .toHaveBeenCalledOnceWith('P001');
  });

  it('should clear cart', () => {

    component.clearCart();

    expect(cartService.clearCart)
      .toHaveBeenCalled();
  });

  it('should return product id from trackByProductId', () => {

    const item = component.cartItems()[0];

    expect(
      component.trackByProductId(
        0,
        item
      )
    ).toBe(item.productId);
  });

  it('should react when cart becomes empty', () => {

    cartItemsSignal.set([]);
    itemCountSignal.set(0);
    uniqueItemCountSignal.set(0);
    subtotalSignal.set(0);
    estimatedTaxSignal.set(0);
    grandTotalSignal.set(0);
    isEmptySignal.set(true);

    fixture.detectChanges();

    expect(component.cartItems()).toEqual([]);
    expect(component.itemCount()).toBe(0);
    expect(component.uniqueItemCount()).toBe(0);
    expect(component.subtotal()).toBe(0);
    expect(component.estimatedTax()).toBe(0);
    expect(component.grandTotal()).toBe(0);
    expect(component.isEmpty()).toBeTrue();
  });

  it('should not throw when proceedToCheckout is called', () => {

    expect(() =>
      component.proceedToCheckout()
    ).not.toThrow();
  });

});