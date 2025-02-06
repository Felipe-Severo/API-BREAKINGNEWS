import express from 'express';
import carController from '../controllers/car.controller.js';
import { validId, validUser } from '../middlewares/global.middleware.js';

const router = express.Router();

router.post('/', carController.create);
router.get('/', carController.findAll);
router.get('/:id', validId, validUser, carController.findById);

export default router;