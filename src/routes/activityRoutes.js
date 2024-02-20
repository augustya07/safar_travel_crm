// routes/activityRoutes.js

import express from 'express';
import * as activityController from '../controllers/activityController.js';

const router = express.Router();

router.get('/search', activityController.searchActivities)

router.get('/', activityController.getAllActivities);
router.get('/:id', activityController.getActivityById);
router.post('/', activityController.createActivity);
router.put('/:id', activityController.updateActivity);
router.delete('/:id', activityController.deleteActivity);

export default router;
