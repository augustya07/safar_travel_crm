import express from 'express';
import ItineraryController from '../controllers/itineraryDayPlanController.js'; 

import ItineraryHotelController from "../controllers/itineraryHotelController.js"

const router = express.Router();

// Route to create a new itinerary
router.post('/', ItineraryController.createItinerary);

// Route to update a hotel in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId
// router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId', ItineraryHotelController.updateHotelInDayPlan);


// Route for adding a hotel to a day plan
router.post('/itinerary/:itineraryId/dayplan/:dayPlanId/hotel', ItineraryHotelController.addHotelToDayPlan);

// Route for updating a hotel in a day plan
router.patch('/itinerary/:itineraryId/dayplan/:dayPlanId/hotel/:itemId', ItineraryHotelController.updateHotelInDayPlan);

// Route for removing a hotel from a day plan
router.delete('/itinerary/:itineraryId/dayplan/:dayPlanId/hotel/:itemId', ItineraryHotelController.removeHotelFromDayPlan);
// Route to update transport in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/transports/:itemId
// router.put('/itineraries/:itineraryId/dayPlans/:dayPlanId/transports/:itemId', ItineraryController.updateHotelInDayPlan);

// Route to add a new day plan
router.post('/itineraries/:itineraryId/dayPlans', ItineraryController.addDayPlan);

// Route to remove an existing day plann
router.delete('/itineraries/:itineraryId/dayPlans/:dayPlanId', ItineraryController.removeDayPlan);

// router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId', ItineraryController.);

// Additional routes for fetching, updating, and deleting itineraries can be added here

export default router;
