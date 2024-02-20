import Itinerary from '../models/Itinerary.js';
import { mongoose } from 'mongoose';

const ItinerarySightseeingController = {
    addSightseeingToDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, sightseeingId } = req.params;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          dayPlan.sightseeing.push(sightseeingId); // Add the sightseeing ID to the day plan
          await itinerary.save();
          res.status(200).send('Sightseeing added to day plan successfully');
        } catch (error) {
          res.status(500).send(error.toString());
        }
      },

      updateSightseeingInDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, oldSightseeingId, newSightseeingId } = req.body;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const sightseeingIndex = dayPlan.sightseeing.indexOf(oldSightseeingId);
          if (sightseeingIndex !== -1) {
            dayPlan.sightseeing[sightseeingIndex] = newSightseeingId; // Replace the old sightseeing ID with the new one
            await itinerary.save();
            res.status(200).send('Sightseeing updated successfully');
          } else {
            res.status(404).send('Sightseeing not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
      },

      removeSightseeingFromDayPlan: async (req, res)  => {
        const { itineraryId, dayPlanId, sightseeingId } = req.params;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const sightseeingIndex = dayPlan.sightseeing.indexOf(sightseeingId);
          if (sightseeingIndex !== -1) {
            dayPlan.sightseeing.splice(sightseeingIndex, 1); // Remove the sightseeing ID from the day plan
            await itinerary.save();
            res.status(200).send('Sightseeing removed from day plan successfully');
          } else {
            res.status(404).send('Sightseeing not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
      }
      
}

export default ItinerarySightseeingController