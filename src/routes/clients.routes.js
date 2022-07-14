import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import { ClientYupSchema } from '../yup-schemas';
import { SchemaValidation } from '../middlewares/validation';

const router = Router();

router.get('/', ClientController.getClients);
router.get('/:id', ClientController.getClientById);
router.post('/', SchemaValidation(ClientYupSchema), ClientController.createClient);
router.put('/:id', SchemaValidation(ClientYupSchema), ClientController.updateClient);
router.delete('/:id', ClientController.deleteClient);

export default router;
