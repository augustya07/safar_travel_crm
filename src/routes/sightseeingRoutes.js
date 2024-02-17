import express from 'express';
import { sightseeingController } from '../controllers/sightseeingController.js'; // Update the path as necessary

const router = express.Router();

router.post('/sightseeings', sightseeingController.addSightseeing);
router.get('/sightseeings', sightseeingController.getSightseeings);
router.get('/sightseeings/:id', sightseeingController.getSightseeingById);
router.put('/sightseeings/:id', sightseeingController.updateSightseeing);
router.delete('/sightseeings/:id', sightseeingController.deleteSightseeing);

export default router;
