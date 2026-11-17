// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { OrderRepository } from '../ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../models/Order';

export class InvalidStatusTransitionError extends Error {
    constructor(fromStatus: OrderStatus, toStatus: OrderStatus) {
        super(`Invalid status transition from ${fromStatus} to ${toStatus}`);
        this.name = 'InvalidStatusTransitionError';
    }
}

export class OrderService {
    private readonly repository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.repository = repository;
    }

    async createOrder(orderData: OrderCreateDTO): Promise<Order> {
      throw new Error('TODO(reto): createOrder');
    }

    async getOrder(orderId: string): Promise<Order | null> {
      throw new Error('TODO(reto): getOrder');
    }

    async updateOrder(orderId: string, orderUpdate: OrderUpdateDTO): Promise<Order> {
      throw new Error('TODO(reto): updateOrder');
    }

    async deleteOrder(orderId: string): Promise<void> {
      throw new Error('TODO(reto): deleteOrder');
    }

    async updateStatus(orderId: string, newStatus: OrderStatus): Promise<Order> {
      throw new Error('TODO(reto): updateStatus');
    }

    private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): void {
      throw new Error('TODO(reto): validateStatusTransition');
    }
}