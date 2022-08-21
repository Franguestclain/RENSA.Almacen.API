import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { SchemaValidation } from '../middlewares/validation';
import { OrderYupSchema } from '../yup-schemas';

const router = Router();

router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrder);
router.post('/', SchemaValidation(OrderYupSchema), OrderController.createOrder);
router.put('/:orderId/material/:materialId', SchemaValidation(OrderYupSchema), OrderController.updateMaterialInOrder);

export default router;
