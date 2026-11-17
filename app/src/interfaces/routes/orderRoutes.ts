import { Router, Request, Response, NextFunction } from 'express';
import { OrderController } from '../controllers/OrderController';

/**
 * Definición de rutas HTTP para el recurso Orders.
 * Expone los endpoints REST para crear, leer, actualizar y eliminar órdenes.
 */
const orderRoutes = Router();

/**
 * Crea una nueva orden.
 * POST /orders
 * Request body: OrderCreateDTO
 * Response: OrderDTO (201 Created)
 */
orderRoutes.post(
    '/orders',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.createOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Obtiene una orden por su identificador.
 * GET /orders/:id
 * Response: OrderDTO (200 OK) o 404 si no existe
 */
orderRoutes.get(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.getOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Actualiza una orden existente.
 * PUT /orders/:id
 * Request body: OrderUpdateDTO
 * Response: OrderDTO (200 OK)
 */
orderRoutes.put(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.updateOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

/**
 * Elimina una orden por su identificador.
 * DELETE /orders/:id
 * Response: 204 No Content
 */
orderRoutes.delete(
    '/orders/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const controller = (req as any).orderController as OrderController;
            await controller.deleteOrder(req, res);
        } catch (error) {
            next(error);
        }
    }
);

export default orderRoutes;