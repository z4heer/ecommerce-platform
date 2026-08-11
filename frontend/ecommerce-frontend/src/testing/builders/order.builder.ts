import {
    OrderItem,
    OrderResponse,
    OrderSummary
} from '../../app/core/models/order.model';

export function createOrderItem(
    overrides: Partial<OrderItem> = {}
): OrderItem {

    return {
        productId: 'P-1001',
        productName: 'Sample Product',
        quantity: 1,
        unitPrice: 500,
        subtotal: 500,
        ...overrides
    };

}

export function createOrder(
    overrides: Partial<OrderResponse> = {}
): OrderResponse {

    return {
        id: 'ORDER-1001',
        userId: 'USER-1001',
        totalAmount: 500,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        items: [
            createOrderItem()
        ],
        ...overrides
    };

}

export function createOrderSummary(
    overrides: Partial<OrderSummary> = {}
): OrderSummary {

    return {
        id: 'ORDER-1001',
        totalAmount: 500,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        ...overrides
    };

}