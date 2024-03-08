import express from 'express';
import { createLead, getAllLeads, getLead, updateLead, deleteLead } from '../controllers/leadController.js';
import * as followUpController from '../controllers/followupController.js';
import * as notesController from '../controllers/notesController.js';
import * as activityController from '../controllers/leadActivityController.js';

const router = express.Router();

// Lead Routes
router.post('/leads', createLead);
router.get('/leads', getAllLeads);
router.get('/leads/:id', getLead);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

// Follow-Up Routes
router.post('/leads/:leadId/followups', followUpController.createFollowUp);
router.get('/leads/:leadId/followups', followUpController.getFollowUpsForLead);
router.put('/followups/:followUpId', followUpController.updateFollowUp);
router.delete('/followups/:followUpId', followUpController.deleteFollowUp);

// Notes Routes
router.post('/leads/:leadId/notes', notesController.addNoteToLead);
router.get('/leads/:leadId/notes', notesController.getNotesForLead);
router.put('/notes/:noteId', notesController.updateNote);
router.delete('/notes/:noteId', notesController.deleteNote);

// Activity Routes
router.post('/leads/:leadId/activities', activityController.logActivity);
router.get('/leads/:leadId/activities', activityController.getActivitiesForLead);
router.put('/activities/:activityId', activityController.updateActivity);
router.delete('/activities/:activityId', activityController.deleteActivity);

export default router;
