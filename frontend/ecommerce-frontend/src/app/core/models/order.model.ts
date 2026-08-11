export type OrderStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED';

export interface OrderItem {
    readonly productId: string;
    readonly productName: string;
    readonly quantity: number;
    readonly unitPrice: number;
    readonly subtotal: number;
}

export interface CreateOrderRequest {
    readonly items: readonly {
        product_id: string;
        quantity: number;
    }[];
    readonly shipping_address?: string;
}

export interface OrderResponse {
    readonly id: string;
    readonly userId: string;
    readonly totalAmount: number;
    readonly status: OrderStatus;
    readonly createdAt: string;
    readonly items: readonly OrderItem[];
}

export interface OrderSummary {
    readonly id: string;
    readonly totalAmount: number;
    readonly status: OrderStatus;
    readonly createdAt: string;
}

export interface OrderListResponse {
    readonly orders: readonly OrderSummary[];
}