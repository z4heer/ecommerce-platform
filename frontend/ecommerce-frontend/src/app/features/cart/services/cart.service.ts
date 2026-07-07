import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../../../core/models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartItems = signal<CartItem[]>([]);

  // Readonly exposures to components
  public cartItems = this._cartItems.asReadonly();

  public itemCount = computed(() =>
    this._cartItems().reduce((acc, item) => acc + item.quantity, 0),
  );

  public totalPrice = computed(() =>
    this._cartItems().reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  public addItem(newItem: CartItem): void {
    this._cartItems.update(items => {
      const existingIndex = items.findIndex(item => item.id === newItem.id);
      if (existingIndex > -1) {
        return items.map((item, index) =>
          index === existingIndex ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        );
      }
      return [...items, newItem];
    });
  }

  public removeItem(itemId: string): void {
    this._cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  public updateQuantity(itemId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }
    this._cartItems.update(items =>
      items.map(item => (item.id === itemId ? { ...item, quantity } : item)),
    );
  }

  public clearCart(): void {
    this._cartItems.set([]);
  }
}
