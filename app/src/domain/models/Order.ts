/**
 * Modelo de dominio para Order.
 * Representa una orden con su estado y items asociados.
 */
export type OrderStatus = 'pending' | 'paid' | 'shipped';

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

export interface Order {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface OrderCreateDTO {
    items: OrderItem[];
}

export interface OrderUpdateDTO {
    status?: OrderStatus;
    items?: OrderItem[];
}

export interface OrderDTO {
    id: string;
    status: OrderStatus;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
}