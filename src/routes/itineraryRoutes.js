import express from 'express';
import ItineraryController from '../controllers/itineraryDayPlanController.js'; 

import ItineraryHotelController from "../controllers/itineraryHotelController.js"

import ItineraryTransportController from '../controllers/inineraryTransportController.js'; // Adjust the path as necessary
import ItineraryServiceController from '../controllers/itineraryServiceController.js';


const router = express.Router();


router.get('/search-itineraries', ItineraryController.searchItineraries);


// Route to create a new itinerary
router.post('/', ItineraryController.createItinerary);

router.get('/:id',ItineraryController.getItineraryById)

// Route to update a hotel in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId
// router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId', ItineraryHotelController.updateHotelInDayPlan);


// Route for adding a hotel to a day plan
router.post('/:itineraryId/dayplan/:dayPlanId', ItineraryHotelController.addHotelToDayPlan);

// Route for updating a hotel in a day plan
router.patch('/:itineraryId/dayplan/:dayPlanId/hotel/:hotelId', ItineraryHotelController.updateHotelInDayPlan);

// Route for removing a hotel from a day plan
router.delete('/:itineraryId/dayplan/:dayPlanId/hotel/:hotelId', ItineraryHotelController.removeHotelFromDayPlan);
// Route to update transport in a specific day plan of an itinerary


// Route to add a new day plan
router.post('/:itineraryId/dayPlan', ItineraryController.addDayPlan);

// Route to remove an existing day plann
router.delete('/itineraries/:itineraryId/dayPlans/:dayPlanId', ItineraryController.removeDayPlan);

// Route to add a transport to a day plan
router.post('/:itineraryId/dayPlan/:dayPlanId/transport', ItineraryTransportController.addTransportToDayPlan);

// Route to update a transport in a day plan
router.patch('/:itineraryId/dayPlan/:dayPlanId/transport/:transportId', ItineraryTransportController.updateTransportInDayPlan);

// Route to remove a transport from a day plan
router.delete('/:itineraryId/dayPlan/:dayPlanId/transport/:transportId', ItineraryTransportController.removeTransportFromDayPlan);

router.post('/itineraries/:itineraryId/dayPlans/:dayPlanId/services/:serviceId',ItineraryServiceController.addServiceToDayPlan);
router.patch('/itineraries/dayPlans/services', ItineraryServiceController.updateServiceInDayPlan);
router.delete('/itineraries/:itineraryId/dayPlans/:dayPlanId/services/:serviceId', ItineraryServiceController.removeServiceFromDayPlan)




export default router;
