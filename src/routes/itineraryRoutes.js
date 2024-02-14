import express from 'express';
import ItineraryController from '../controllers/itineraryDayPlanController.js'; // Adjust the path as necessary

const router = express.Router();

// Route to create a new itinerary
router.post('/', ItineraryController.createItinerary);

// Route to update a hotel in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId
router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId', ItineraryController.updateHotelInDayPlan);

// Route to update transport in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/transports/:itemId
router.put('/itineraries/:itineraryId/dayPlans/:dayPlanId/transports/:itemId', ItineraryController.updateTransportInDayPlan);

// Route to add a new day plan
router.post('/itineraries/:itineraryId/dayPlans', ItineraryController.addDayPlan);

// Route to remove an existing day plan
router.delete('/itineraries/:itineraryId/dayPlans/:dayPlanId', ItineraryController.removeDayPlan);

router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId', ItineraryController.updateDayPlan);

// Additional routes for fetching, updating, and deleting itineraries can be added here

export default router;
