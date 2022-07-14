import { Router } from 'express';
import AreaController from '../controllers/AreaController';
import { AreaYupSchema } from '../yup-schemas';
import { SchemaValidation } from '../middlewares/validation';

const router = Router();

router.get('/', AreaController.getAreas);
router.get('/:id', AreaController.getAreaById);
router.post('/', SchemaValidation(AreaYupSchema), AreaController.createArea);
router.put('/:id', SchemaValidation(AreaYupSchema), AreaController.updateArea);
router.delete('/:id', AreaController.deleteArea);

export default router;
