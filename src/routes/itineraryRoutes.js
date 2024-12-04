import express from 'express';
import ItineraryController from '../controllers/itineraryDayPlanController.js'; 

import ItineraryHotelController from "../controllers/itineraryHotelController.js"

import ItineraryTransportController from '../controllers/inineraryTransportController.js'; 
import ItineraryServiceController from '../controllers/itineraryServiceController.js';
import ItinerarySightseeingController from '../controllers/itinerarySightseeingController.js';
import ItineraryActivityController from '../controllers/itineraryActivityController.js';


const router = express.Router();




// Route to create a new itinerary
router.get('/search-itineraries', ItineraryController.searchItineraries);
router.post('/', ItineraryController.createItinerary);
router.get('/:id', ItineraryController.getItineraryById);

// Route to update a hotel in a specific day plan of an itinerary
// Assuming URLs like /itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId
// router.patch('/itineraries/:itineraryId/dayPlans/:dayPlanId/hotels/:itemId', ItineraryHotelController.updateHotelInDayPlan);


// Route for adding a hotel to a day plan
router.post('/:itineraryId/dayPlan/:dayPlanId/hotel', ItineraryHotelController.addHotelToDayPlan);
router.patch('/:itineraryId/dayPlan/:dayPlanId/hotel/:hotelId', ItineraryHotelController.updateHotelInDayPlan);
router.delete('/:itineraryId/dayPlan/:dayPlanId/hotel/:hotelId', ItineraryHotelController.removeHotelFromDayPlan);
// Route to update transport in a specific day plan of an itinerary


// Route to add a new day plan
router.post('/:itineraryId/dayPlan', ItineraryController.addDayPlan);
router.delete('/:itineraryId/dayPlan/:dayPlanId', ItineraryController.removeDayPlan); ;

// Route to add a transport to a day plan
router.post('/:itineraryId/dayPlan/:dayPlanId/transport', ItineraryTransportController.addTransportToDayPlan);

// Route to update a transport in a day plan
router.patch('/:itineraryId/dayPlan/:dayPlanId/transport/:transportId', ItineraryTransportController.updateTransportInDayPlan);

// Route to remove a transport from a day plan
router.delete('/:itineraryId/dayPlan/:dayPlanId/transport/:transportId', ItineraryTransportController.removeTransportFromDayPlan);

router.post('/:itineraryId/dayPlan/:dayPlanId/service',ItineraryServiceController.addServiceToDayPlan);
router.patch('/:itineraryId/dayPlan/:dayPlanId/service/:serviceId', ItineraryServiceController.updateServiceInDayPlan);
router.delete('/:itineraryId/dayPlan/:dayPlanId/service/:serviceId', ItineraryServiceController.removeServiceFromDayPlan)

router.post('/:itineraryId/dayPlan/:dayPlanId/sightseeing', ItinerarySightseeingController.addSightseeingToDayPlan);
router.patch('/:itineraryId/dayPlan/:dayPlanId/sightseeing/:sightseeingId',ItinerarySightseeingController.updateSightseeingInDayPlan);
router.delete('/:itineraryId/dayPlan/:dayPlanId/sightseeing/:sightseeingId',ItinerarySightseeingController.removeSightseeingFromDayPlan);

router.post('/:itineraryId/dayPlan/:dayPlanId/activity', ItineraryActivityController.addActivityToDayPlan);
router.patch('/:itineraryId/dayPlan/:dayPlanId/activity/:oldActivityId', ItineraryActivityController.updateActivityInDayPlan);
router.delete('/:itineraryId/dayPlan/:dayPlanId/activity/:activityId', ItineraryActivityController.removeActivityFromDayPlan);




export default router;
