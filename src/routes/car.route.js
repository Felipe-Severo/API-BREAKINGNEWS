import express from 'express';
import carController from '../controllers/car.controller.js';

const router = express.Router();

router.post('/', carController.create);

export default router;