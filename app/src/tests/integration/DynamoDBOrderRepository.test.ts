import { DynamoDBOrderRepository } from '../../infrastructure/repositories/DynamoDBOrderRepository';
import { dynamoDBClient } from '../../infrastructure/config/DynamoDBClientConfig';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';
import { OrderAlreadyExistsError, OrderNotFoundError, InvalidOrderDataError } from '../../infrastructure/repositories/DynamoDBOrderRepository';

describe('DynamoDBOrderRepository', () => {
    let repository: DynamoDBOrderRepository;
    let mockDocClient: {
        send: jest.Mock;
    };
    let mockDynamoDBClient: jest.Mocked<typeof dynamoDBClient>;

    beforeEach(() => {
        mockDocClient = {
            send: jest.fn()
        };
        mockDynamoDBClient = {
            send: mockDocClient.send
        } as unknown as jest.Mocked<typeof dynamoDBClient>;
        
        repository = new DynamoDBOrderRepository(mockDynamoDBClient, 'test-orders-table');
    });

    const createMockOrder = (overrides?: Partial<Order>): Order => ({
        id: 'order-123',
        status: 'pending' as OrderStatus,
        items: [{ productId: 'prod-1', quantity: 2, price: 100 }],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
        ...overrides
    });

    describe('create', () => {
        it('debe crear una orden exitosamente', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: 2, price: 100 }]
            };
            const mockOrder = createMockOrder();
            
            mockDocClient.send.mockResolvedValueOnce({});

            const result = await repository.create(orderData);

            expect(mockDocClient.send).toHaveBeenCalled();
            expect(result.items).toEqual(orderData.items);
            expect(result.status).toBe('pending');
        });

        it('debe lanzar error si los items están vacíos', async () => {
            const orderData: OrderCreateDTO = { items: [] };

            await expect(repository.create(orderData)).rejects.toThrow(InvalidOrderDataError);
        });

        it('debe lanzar error si un item tiene cantidad negativa', async () => {
            const orderData: OrderCreateDTO = {
                items: [{ productId: 'prod-1', quantity: -1, price: 100 }]
            };

            await expect(repository.create(orderData)).rejects.toThrow(InvalidOrderDataError);
        });
    });

    describe('findById', () => {
        it('debe retornar una orden por su id', async () => {
            const mockOrder = createMockOrder();
            
            mockDocClient.send.mockResolvedValueOnce({
                Item: {
                    id: mockOrder.id,
                    status: mockOrder.status,
                    items: mockOrder.items,
                    createdAt: mockOrder.createdAt.toISOString(),
                    updatedAt: mockOrder.updatedAt.toISOString()
                }
            });

            const result = await repository.findById('order-123');

            expect(result).toBeDefined();
            expect(result?.id).toBe('order-123');
            expect(result?.status).toBe('pending');
        });

        it('debe retornar null si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            const result = await repository.findById('non-existent');

            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('debe actualizar una orden exitosamente', async () => {
            const existingOrder = createMockOrder();
            const updateData: OrderUpdateDTO = { status: 'paid' };
            const updatedOrder = { ...existingOrder, status: 'paid' as OrderStatus };
            
            mockDocClient.send
                .mockResolvedValueOnce({
                    Item: {
                        id: existingOrder.id,
                        status: existingOrder.status,
                        items: existingOrder.items,
                        createdAt: existingOrder.createdAt.toISOString(),
                        updatedAt: existingOrder.updatedAt.toISOString()
                    }
                })
                .mockResolvedValueOnce({});

            const result = await repository.update('order-123', updateData);

            expect(result.status).toBe('paid');
        });

        it('debe lanzar error si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            await expect(repository.update('non-existent', { status: 'paid' }))
                .rejects.toThrow(OrderNotFoundError);
        });

        it('debe validar transición de estado', async () => {
            const existingOrder = createMockOrder({ status: 'shipped' });
            
            mockDocClient.send.mockResolvedValueOnce({
                Item: {
                    id: existingOrder.id,
                    status: existingOrder.status,
                    items: existingOrder.items,
                    createdAt: existingOrder.createdAt.toISOString(),
                    updatedAt: existingOrder.updatedAt.toISOString()
                }
            });

            await expect(repository.update('order-123', { status: 'pending' }))
                .rejects.toThrow();
        });
    });

    describe('delete', () => {
        it('debe eliminar una orden exitosamente', async () => {
            const existingOrder = createMockOrder();
            
            mockDocClient.send
                .mockResolvedValueOnce({
                    Item: {
                        id: existingOrder.id,
                        status: existingOrder.status,
                        items: existingOrder.items,
                        createdAt: existingOrder.createdAt.toISOString(),
                        updatedAt: existingOrder.updatedAt.toISOString()
                    }
                })
                .mockResolvedValueOnce({});

            await repository.delete('order-123');

            expect(mockDocClient.send).toHaveBeenCalledTimes(2);
        });

        it('debe lanzar error si la orden no existe', async () => {
            mockDocClient.send.mockResolvedValueOnce({});

            await expect(repository.delete('non-existent')).rejects.toThrow(OrderNotFoundError);
        });
    });
});