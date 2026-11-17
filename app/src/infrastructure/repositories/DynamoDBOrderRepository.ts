// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepository } from '../../domain/ports/OrderRepository.port';
import { Order, OrderCreateDTO, OrderUpdateDTO, OrderStatus } from '../../domain/models/Order';

export class OrderAlreadyExistsError extends Error {
    constructor(orderId: string) {
        super(`Order with id ${orderId} already exists`);
        this.name = 'OrderAlreadyExistsError';
    }
}

export class OrderNotFoundError extends Error {
    constructor(orderId: string) {
        super(`Order with id ${orderId} not found`);
        this.name = 'OrderNotFoundError';
    }
}

export class InvalidOrderDataError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidOrderDataError';
    }
}

const VALID_STATUSES: OrderStatus[] = ['pending', 'paid', 'shipped'];

function isValidStatus(status: unknown): status is OrderStatus {
  throw new Error('TODO(reto): isValidStatus');
}

export class DynamoDBOrderRepository implements OrderRepository {
    private readonly docClient: DynamoDBDocumentClient;
    private readonly tableName: string;

    constructor(dynamoDBClient: DynamoDBClient, tableName: string = process.env.ORDERS_TABLE || 'orders') {
        this.docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
            marshallOptions: {
                removeUndefinedValues: true,
            },
        });
        this.tableName = tableName;
    }

    private validateOrderData(order: OrderCreateDTO): void {
      throw new Error('TODO(reto): validateOrderData');
    }

    private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): boolean {
      throw new Error('TODO(reto): validateStatusTransition');
    }

    async create(orderData: OrderCreateDTO): Promise<Order> {
      throw new Error('TODO(reto): create');
    }

    async findById(id: string): Promise<Order | null> {
      throw new Error('TODO(reto): findById');
    }

    async update(id: string, orderUpdate: OrderUpdateDTO): Promise<Order> {
      throw new Error('TODO(reto): update');
    }

    async delete(id: string): Promise<void> {
      throw new Error('TODO(reto): delete');
    }
}