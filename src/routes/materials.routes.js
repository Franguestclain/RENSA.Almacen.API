import { Router } from 'express';
import MaterialController from '../controllers/MaterialController';
import { SchemaValidation } from '../middlewares/validation';
import { MaterialYupSchema } from '../yup-schemas';

const router = Router();

router.get('/', MaterialController.getMaterials);
router.get('/:id', MaterialController.getMaterialById);
router.post('/', SchemaValidation(MaterialYupSchema), MaterialController.createMaterial);
router.put('/:id', SchemaValidation(MaterialYupSchema), MaterialController.updateMaterial);
router.delete('/:id', MaterialController.deleteMaterial);

export default router;
