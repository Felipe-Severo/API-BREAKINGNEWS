import express from 'express';
import userController from '../controllers/user.controller.js';
import userService from '../services/user.service.js';

const router = express.Router();

import { validId, validEntity } from '../middlewares/global.middleware.js';

router.post('/', userController.create);
router.get('/', userController.findAll);
router.get('/:id', validId, validEntity(userService, 'User'), userController.findById);
router.patch('/:id', validId, validEntity(userService, 'User'), userController.update);

export default router;