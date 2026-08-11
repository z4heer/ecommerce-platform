import { CartItem } from '../../app/core/models/cart.model';

export function createCartItem(
    overrides: Partial<CartItem> = {}
): CartItem {

    return {

        productId: 'P-1001',

        productName: 'Sample Product',

        quantity: 1,

        unitPrice: 500,

        stockQuantity: 100,

        status: 'In Stock',

        addedAt: new Date(),

        ...overrides

    };

}