import {Router} from 'express';
import carController from '../controllers/car.controller.js';
import carService from '../services/car.service.js';

const router = Router();

import { validId, validEntity } from '../middlewares/global.middleware.js';

router.post('/', carController.create);
router.get('/', carController.findAll);
router.get('/:id', validId, validEntity(carService, 'Car'), carController.findById);

export default router;