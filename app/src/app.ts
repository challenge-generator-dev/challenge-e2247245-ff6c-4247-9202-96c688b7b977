import express, { Application, Request, Response, NextFunction } from 'express';
import { OrderController } from './interfaces/controllers/OrderController';
import { OrderService } from './domain/services/OrderService';
import { DynamoDBOrderRepository } from './infrastructure/repositories/DynamoDBOrderRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION || 'us-east-1',
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: process.env.AWS_ACCESS_KEY_ID ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    } : undefined,
});

const docClient = DynamoDBDocumentClient.from(dynamoDBClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
});

const tableName = process.env.ORDERS_TABLE || 'orders';
const orderRepository = new DynamoDBOrderRepository(dynamoDBClient, tableName);
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

app.post('/orders', (req: Request, res: Response) => orderController.createOrder(req, res));
app.get('/orders/:id', (req: Request, res: Response) => orderController.getOrder(req, res));
app.put('/orders/:id', (req: Request, res: Response) => orderController.updateOrder(req, res));
app.delete('/orders/:id', (req: Request, res: Response) => orderController.deleteOrder(req, res));

app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

export default app;