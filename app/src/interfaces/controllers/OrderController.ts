import { Request, Response } from 'express';
import { OrderService } from '../../domain/services/OrderService';
import { OrderCreateDTO, OrderUpdateDTO, OrderDTO, OrderItem } from '../../domain/models/Order';
import { validate } from 'class-validator';
import { plainToInstance, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { OrderStatus } from '../../domain/models/Order';

class OrderItemDTO {
    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @Min(1)
    quantity!: number;

    @IsNumber()
    @Min(0)
    price!: number;
}

class OrderCreateDTOClass {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items!: OrderItemDTO[];
}

class OrderUpdateDTOClass {
    @IsOptional()
    @IsEnum(['pending', 'paid', 'shipped'])
    status?: OrderStatus;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDTO)
    items?: OrderItemDTO[];
}

export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderCreateDTO = plainToInstance(OrderCreateDTOClass, req.body);
            const errors = await validate(orderCreateDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(e => ({ property: e.property, constraints: e.constraints })) });
                return;
            }

            const items: OrderItem[] = orderCreateDTO.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }));

            const orderData: OrderCreateDTO = { items };
            const order = await this.orderService.createOrder(orderData);
            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(201).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const order = await this.orderService.getOrder(id);
            if (!order) {
                res.status(404).json({ error: 'Order not found' });
                return;
            }

            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(200).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const orderUpdateDTO = plainToInstance(OrderUpdateDTOClass, req.body);
            const errors = await validate(orderUpdateDTO);
            if (errors.length > 0) {
                res.status(400).json({ errors: errors.map(e => ({ property: e.property, constraints: e.constraints })) });
                return;
            }

            const updateData: OrderUpdateDTO = {};
            if (orderUpdateDTO.status !== undefined) {
                updateData.status = orderUpdateDTO.status;
            }
            if (orderUpdateDTO.items) {
                updateData.items = orderUpdateDTO.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }));
            }

            const order = await this.orderService.updateOrder(id, updateData);
            const orderDTO: OrderDTO = {
                id: order.id,
                status: order.status,
                items: order.items,
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString()
            };
            res.status(200).json(orderDTO);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.orderService.deleteOrder(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}