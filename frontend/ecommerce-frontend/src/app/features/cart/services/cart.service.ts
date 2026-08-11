import { Injectable, computed, signal, WritableSignal, Signal } from '@angular/core';

import { CartItem } from '../../../core/models/cart.model';
import { Product } from '../../../core/models/product.model';

import { StorageService } from '../../../core/services/storage.service';
import { LoggerService } from '../../../core/services/logger.service';
import { NotificationService } from '../../../core/services/notification.service';

import { STORAGE_KEYS } from '../../../core/constants/storage.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  /**
   * Enterprise tax configuration.
   * Replace with backend configuration if required.
   */
  private static readonly TAX_RATE = 0.08;

  /**
   * Internal writable signal.
   * Never expose writable state outside this service.
   */
  private readonly cartItemsSignal: WritableSignal<CartItem[]> =
    signal<CartItem[]>([]);

  /**
   * Readonly cart items.
   */
  readonly cartItems: Signal<CartItem[]> =
    this.cartItemsSignal.asReadonly();

  /**
   * Total quantity across all products.
   */
  readonly itemCount = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  /**
   * Number of unique products.
   */
  readonly uniqueItemCount = computed(() =>
    this.cartItems().length
  );

  /**
   * Cart subtotal.
   */
  readonly subtotal = computed(() =>
    this.roundCurrency(
      this.cartItems().reduce(
        (total, item) => total + (item.unitPrice * item.quantity),
        0
      )
    )
  );

  /**
   * Estimated tax.
   */
  readonly estimatedTax = computed(() =>
    this.roundCurrency(
      this.subtotal() * CartService.TAX_RATE
    )
  );

  /**
   * Grand total.
   */
  readonly grandTotal = computed(() =>
    this.roundCurrency(
      this.subtotal() + this.estimatedTax()
    )
  );

  /**
   * Empty cart indicator.
   */
  readonly isEmpty = computed(() =>
    this.cartItems().length === 0
  );

  constructor(
    private readonly storageService: StorageService,
    private readonly logger: LoggerService,
    private readonly notification: NotificationService
  ) {
    this.restoreCart();
  }

  /**
   * Adds a product to the shopping cart.
   * If the product already exists, increments quantity.
   */
  addToCart(product: Product): void {

    const currentItems = this.cartItemsSignal();

    const existingItem = currentItems.find(
      item => item.productId === product.id
    );

    if (existingItem) {
      if (existingItem.quantity >= existingItem.stockQuantity) {

        this.notification.warning(
          `Only ${existingItem.stockQuantity} item(s) available in stock.`
        );

        return;
      }
      this.updateQuantity(
        product.id,
        existingItem.quantity + 1
      );

      return;
    }

    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      productImageUrl: product.imageUrl,
      quantity: 1,
      unitPrice: product.price,
      stockQuantity: product.stock_quantity,
      status: product.status ?? 'Unknown',
      addedAt: new Date()
    };

    this.cartItemsSignal.set([
      ...currentItems,
      cartItem
    ]);

    this.persistCart();

    this.logger.info('Product added to cart', cartItem);

    this.notification.success(
      `${product.name} added to cart`
    );
  }

  /**
   * Removes a product from cart.
   */
  removeFromCart(productId: string): void {

    const updatedItems = this.cartItemsSignal().filter(
      item => item.productId !== productId
    );

    this.cartItemsSignal.set(updatedItems);

    this.persistCart();

    this.logger.info(
      'Product removed from cart',
      { productId }
    );

    this.notification.success(
      'Item removed from cart'
    );
  }

  /**
   * Updates cart quantity.
   */
  updateQuantity(
    productId: string,
    quantity: number
  ): void {

    const updatedItems = this.cartItemsSignal().map(item => {

      if (item.productId !== productId) {
        return item;
      }

      let validatedQuantity = quantity;

      if (quantity < 1) {

        validatedQuantity = 1;

        this.notification.warning(
          'Quantity cannot be less than 1.'
        );
      }

      if (quantity > item.stockQuantity) {

        validatedQuantity = item.stockQuantity;

        this.notification.warning(
          `Only ${item.stockQuantity} item(s) available in stock.`
        );
      }

      this.logger.info(
        'Cart quantity updated',
        {
          productId,
          requestedQuantity: quantity,
          appliedQuantity: validatedQuantity
        }
      );

      return {
        ...item,
        quantity: validatedQuantity
      };

    });

    this.cartItemsSignal.set(updatedItems);

    this.persistCart();

  }

  /**
   * Clears entire cart.
   */
  clearCart(): void {

    this.cartItemsSignal.set([]);

    this.persistCart();

    this.logger.info('Cart cleared');

    this.notification.success(
      'Cart cleared'
    );
  }

  /**
   * Returns quantity for a product.
   */
  getQuantity(productId: string): number {

    return (
      this.cartItemsSignal()
        .find(item => item.productId === productId)
        ?.quantity ?? 0
    );
  }

  /**
   * Checks if product exists in cart.
   */
  isInCart(productId: string): boolean {

    return this.cartItemsSignal().some(
      item => item.productId === productId
    );
  }

  /**
   * Restores persisted cart.
   */
  restoreCart(): void {

    const savedCart =
      this.storageService.getItem<CartItem[]>(
        STORAGE_KEYS.CART.ITEMS
      );

    if (!savedCart) {

      this.logger.info('No persisted cart found.');

      return;
    }

    const restoredItems = savedCart.map(item => ({
      ...item,
      addedAt: new Date(item.addedAt)
    }));

    this.cartItemsSignal.set(restoredItems);

    this.logger.info(
      'Cart restored from storage.',
      restoredItems
    );
  }

  /**
   * Persists current cart.
   */
  private persistCart(): void {

    this.storageService.setItem(
      STORAGE_KEYS.CART.ITEMS,
      this.cartItemsSignal()
    );
  }

  /**
   * Enterprise monetary rounding.
   */
  private roundCurrency(value: number): number {

    return Number(value.toFixed(2));
  }

}