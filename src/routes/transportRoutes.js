// routes/transportRoutes.js

import express from 'express';
import * as transportController from '../controllers/transportController.js';

const router = express.Router();


router.get('/search', transportController.search)
router.get('/', transportController.getAllTransports);
router.get('/:id', transportController.getTransportById);
router.post('/', transportController.createTransport); // This will handle both single and multiple entries
router.put('/:id', transportController.updateTransport);
router.delete('/:id', transportController.deleteTransport);

export default router;
