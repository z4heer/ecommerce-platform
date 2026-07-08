export interface ShippingAddress {

    fullName: string;

    email: string;

    phone: string;

    addressLine1: string;

    addressLine2?: string;

    city: string;

    state: string;

    postalCode: string;

    country: string;

}

export type PaymentMethod =
    | 'COD'
    | 'CARD'
    | 'UPI';

export interface CheckoutSummary {

    subtotal: number;

    tax: number;

    shippingCharge: number;

    discount: number;

    grandTotal: number;

}

export interface CheckoutState {

    shippingAddress: ShippingAddress | null;

    paymentMethod: PaymentMethod;

    orderNotes: string;

    summary: CheckoutSummary;

}