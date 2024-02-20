import Itinerary from '../models/Itinerary.js';
import { mongoose } from 'mongoose';


const ItineraryServiceController = {
    addServiceToDayPlan: async (req, res)  => {
        const { itineraryId, dayPlanId, serviceId } = req.params;
      
        try {
          // Find the itinerary and update it
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
          dayPlan.services.push(serviceId); // Add the service ID to the day plan
      
          await itinerary.save();
          res.status(200).send('Service added to day plan successfully');
        } catch (error) {
          res.status(500).send(error.toString());
        }
      },

      updateServiceInDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, oldServiceId, newServiceId } = req.body;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const serviceIndex = dayPlan.services.indexOf(oldServiceId);
          if (serviceIndex !== -1) {
            dayPlan.services[serviceIndex] = newServiceId; // Replace the old service ID with the new one
            await itinerary.save();
            res.status(200).send('Service updated successfully');
          } else {
            res.status(404).send('Service not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
      },

      removeServiceFromDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, serviceId } = req.params;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const serviceIndex = dayPlan.services.indexOf(serviceId);
          if (serviceIndex !== -1) {
            dayPlan.services.splice(serviceIndex, 1); // Remove the service ID from the day plan
            await itinerary.save();
            res.status(200).send('Service removed from day plan successfully');
          } else {
            res.status(404).send('Service not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
      }
      
}

export default ItineraryServiceController