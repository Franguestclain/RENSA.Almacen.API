import { Router } from 'express';
import ProviderController from '../controllers/ProviderController';
import { ProviderYupSchema } from '../yup-schemas';
import { SchemaValidation } from '../middlewares/validation';

const router = Router();

router.get('/', ProviderController.getProviders);
router.get('/:id', ProviderController.getProviderById);
router.post('/', SchemaValidation(ProviderYupSchema), ProviderController.createProvider);
router.put('/:id', SchemaValidation(ProviderYupSchema), ProviderController.updateProvider);
router.delete('/:id', ProviderController.deleteProvider);

export default router;
