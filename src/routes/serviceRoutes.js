// routes/serviceRoutes.js

import express from 'express';
import * as serviceController from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', serviceController.createService); // Handles both single and multiple services
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

export default router;
