import { OrderService } from '../../domain/services/OrderService';
import { OrderRepository } from '../../domain/ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';
import { InvalidStatusTransitionError } from '../../domain/services/OrderService';

describe('OrderService', () => {
    let orderService: OrderService;
    let mockRepository: jest.Mocked<OrderRepository>;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as jest.Mocked<OrderRepository>;
        orderService = new OrderService(mockRepository);
    });

    const createMockOrder = (overrides?: Partial<Order>): Order => ({
        id: 'order-123',
        status: 'pending' as OrderStatus,
        items: [{ productId: 'prod-1', quantity: 2, price: 100 }],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides
    });

    describe('createOrder', () => {
        it('debe crear una orden exitosamente', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            const mockOrder = createMockOrder();
            mockRepository.create.mockResolvedValue(mockOrder);

            const result = await orderService.createOrder(orderData);

            expect(mockRepository.create).toHaveBeenCalledWith(orderData);
            expect(result).toEqual(mockOrder);
        });

        it('debe propagar errores del repositorio', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            mockRepository.create.mockRejectedValue(new Error('DB error'));

            await expect(orderService.createOrder(orderData)).rejects.toThrow('DB error');
        });
    });

    describe('getOrder', () => {
        it('debe retornar una orden por su id', async () => {
            const mockOrder = createMockOrder();
            mockRepository.findById.mockResolvedValue(mockOrder);

            const result = await orderService.getOrder('order-123');

            expect(mockRepository.findById).toHaveBeenCalledWith('order-123');
            expect(result).toEqual(mockOrder);
        });

        it('debe retornar null si la orden no existe', async () => {
            mockRepository.findById.mockResolvedValue(null);

            const result = await orderService.getOrder('non-existent');

            expect(mockRepository.findById).toHaveBeenCalledWith('non-existent');
            expect(result).toBeNull();
        });
    });

    describe('updateOrder', () => {
        it('debe actualizar una orden exitosamente', async () => {
            const updateData: OrderUpdateDTO = { status: 'paid' };
            const mockOrder = createMockOrder({ status: 'paid' });
            mockRepository.update.mockResolvedValue(mockOrder);

            const result = await orderService.updateOrder('order-123', updateData);

            expect(mockRepository.update).toHaveBeenCalledWith('order-123', updateData);
            expect(result.status).toBe('paid');
        });

        it('debe propagar errores del repositorio', async () => {
            const updateData: OrderUpdateDTO = { status: 'paid' };
            mockRepository.update.mockRejectedValue(new Error('Update failed'));

            await expect(orderService.updateOrder('order-123', updateData))
                .rejects.toThrow('Update failed');
        });
    });

    describe('deleteOrder', () => {
        it('debe eliminar una orden exitosamente', async () => {
            mockRepository.delete.mockResolvedValue();

            await orderService.deleteOrder('order-123');

            expect(mockRepository.delete).toHaveBeenCalledWith('order-123');
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.delete.mockRejectedValue(new Error('Delete failed'));

            await expect(orderService.deleteOrder('order-123'))
                .rejects.toThrow('Delete failed');
        });
    });

    describe('updateStatus', () => {
        it('debe actualizar el status de una orden exitosamente', async () => {
            const mockOrder = createMockOrder({ status: 'paid' });
            mockRepository.findById.mockResolvedValue(mockOrder);
            mockRepository.update.mockResolvedValue(mockOrder);

            const result = await orderService.updateStatus('order-123', 'paid');

            expect(mockRepository.update).toHaveBeenCalledWith('order-123', { status: 'paid' });
            expect(result.status).toBe('paid');
        });

        it('debe lanzar error cuando la orden no existe', async () => {
            mockRepository.findById.mockResolvedValue(null);

            await expect(orderService.updateStatus('non-existent', 'paid'))
                .rejects.toThrow();
        });

        it('debe lanzar error en transición de estado inválida', async () => {
            const mockOrder = createMockOrder({ status: 'shipped' });
            mockRepository.findById.mockResolvedValue(mockOrder);

            await expect(orderService.updateStatus('order-123', 'pending'))
                .rejects.toThrow(InvalidStatusTransitionError);
        });
    });

    describe('validateStatusTransition', () => {
        it('debe permitir transición de pending a paid', () => {
            expect(() => {
                orderService['validateStatusTransition']('pending', 'paid');
            }).not.toThrow();
        });

        it('debe permitir transición de paid a shipped', () => {
            expect(() => {
                orderService['validateStatusTransition']('paid', 'shipped');
            }).not.toThrow();
        });

        it('debe lanzar error en transición inválida de pending a shipped', () => {
            expect(() => {
                orderService['validateStatusTransition']('pending', 'shipped');
            }).toThrow(InvalidStatusTransitionError);
        });

        it('debe lanzar error en transición de shipped a cualquier estado', () => {
            expect(() => {
                orderService['validateStatusTransition']('shipped', 'pending');
            }).toThrow(InvalidStatusTransitionError);
            expect(() => {
                orderService['validateStatusTransition']('shipped', 'paid');
            }).toThrow(InvalidStatusTransitionError);
        });
    });
});