/**
 * Puerto (interfaz) para el repositorio de órdenes.
 * Define los métodos que deben implementarse para interactuar con la persistencia.
 */
import { Order, OrderCreateDTO, OrderUpdateDTO } from '../models/Order';

export interface OrderRepository {
    create(order: OrderCreateDTO): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    update(id: string, order: OrderUpdateDTO): Promise<Order>;
    delete(id: string): Promise<void>;
}