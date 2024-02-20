// Import the Itinerary model and mongoose for ObjectId validation
import Itinerary from '../models/Itinerary.js';
import { mongoose } from 'mongoose';

const ItineraryActivityController = {
    addActivityToDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId } = req.params;
        const {activityId} = req.body;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          // Add the activity ID to the day plan
          dayPlan.activities.push(activityId); 
          await itinerary.save();
          res.status(200).send('Activity added to day plan successfully');
        } catch (error) {
          res.status(500).send(error.toString());
        }
    },

    updateActivityInDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, oldActivityId } = req.params;
        const {newActivityId} = req.body
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const activityIndex = dayPlan.activities.indexOf(oldActivityId);
          if (activityIndex !== -1) {
            // Replace the old activity ID with the new one
            dayPlan.activities[activityIndex] = newActivityId; 
            await itinerary.save();
            res.status(200).send('Activity updated successfully');
          } else {
            res.status(404).send('Activity not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
    },

    removeActivityFromDayPlan: async (req, res) => {
        const { itineraryId, dayPlanId, activityId } = req.params;
      
        try {
          const itinerary = await Itinerary.findById(itineraryId);
          const dayPlan = itinerary.dayPlans.id(dayPlanId);
          if (!dayPlan) {
            return res.status(404).send('Day plan not found');
          }
      
          const activityIndex = dayPlan.activities.indexOf(activityId);
          if (activityIndex !== -1) {
            // Remove the activity ID from the day plan
            dayPlan.activities.splice(activityIndex, 1); 
            await itinerary.save();
            res.status(200).send('Activity removed from day plan successfully');
          } else {
            res.status(404).send('Activity not found in day plan');
          }
        } catch (error) {
          res.status(500).send(error.toString());
        }
    }  
}

export default ItineraryActivityController;
