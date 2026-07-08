import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CartService } from './services/cart.service';
import { CartItem } from '../../core/models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  readonly cartService = inject(CartService);

  /**
   * Expose computed signals to template.
   */
  readonly cartItems = this.cartService.cartItems;
  readonly itemCount = this.cartService.itemCount;
  readonly uniqueItemCount = this.cartService.uniqueItemCount;
  readonly subtotal = this.cartService.subtotal;
  readonly estimatedTax = this.cartService.estimatedTax;
  readonly grandTotal = this.cartService.grandTotal;
  readonly isEmpty = this.cartService.isEmpty;

  /**
   * TrackBy for efficient rendering.
   */
  trackByProductId(
    index: number,
    item: CartItem
  ): string {
    return item.productId;
  }

  /**
   * Increase quantity.
   */
  increaseQuantity(item: CartItem): void {

    this.cartService.updateQuantity(
      item.productId,
      item.quantity + 1
    );
  }

  /**
   * Decrease quantity.
   */
  decreaseQuantity(item: CartItem): void {

    this.cartService.updateQuantity(
      item.productId,
      item.quantity - 1
    );
  }

  /**
   * Remove item.
   */
  removeItem(productId: string): void {

    this.cartService.removeFromCart(productId);
  }

  /**
   * Clear cart.
   */
  clearCart(): void {

    this.cartService.clearCart();
  }

  /**
   * Checkout placeholder.
   * Will be connected during Checkout sprint.
   */
  proceedToCheckout(): void {

    // TODO
  }

}