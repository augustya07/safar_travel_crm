import express from 'express';
import { sightseeingController } from '../controllers/sightseeingController.js'; // Update the path as necessary

const router = express.Router();

router.post('/', sightseeingController.addSightseeing);
router.get('/', sightseeingController.getSightseeings);
router.get('/:id', sightseeingController.getSightseeingById);
router.put('/:id', sightseeingController.updateSightseeing);
router.delete('/:id', sightseeingController.deleteSightseeing);

export default router;
