import Itinerary from '../models/Itinerary.js';
import { mongoose } from 'mongoose';

// Helper function to find itinerary and day plan
async function findItineraryAndDayPlan(itineraryId, dayPlanId) {
  const itinerary = await Itinerary.findById(itineraryId);
  if (!itinerary) {
    throw new Error('Itinerary not found');
  }

  const dayPlan = itinerary.dayPlans.id(dayPlanId);
  if (!dayPlan) {
    throw new Error('Day plan not found');
  }

  return { itinerary, dayPlan };
}

const ItineraryTransportController = {
  // Add a Transport to a Day Plan
  addTransportToDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId } = req.params;
    const { transportId } = req.body; // Assuming transportId is the ObjectId of the transport to be added

    try {
      if (!mongoose.Types.ObjectId.isValid(transportId)) {
        return res.status(400).json({ message: 'Invalid transport ID' });
      }

      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      // Add the transportId to the transports array of the dayPlan
      dayPlan.transports.push(transportId);

      await itinerary.save();
      res.status(201).json({ message: 'Transport added successfully to day plan', itinerary });
    } catch (error) {
      console.error('Error in addTransportToDayPlan:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Update a Transport in a Day Plan
  updateTransportInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, transportId } = req.params; // Assuming transportId is the existing transport's ID
    const { newTransportId } = req.body; // The new transport ID to replace the old one

    try {
      if (!mongoose.Types.ObjectId.isValid(newTransportId) || transportId === newTransportId) {
        return res.status(400).json({ message: 'Invalid or same new transport ID' });
      }

      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      const transportIndex = dayPlan.transports.findIndex(trans => trans.toString() === transportId);
      if (transportIndex === -1) {
        return res.status(404).json({ message: 'Transport not found in day plan' });
      }

      // Update the transport reference
      dayPlan.transports[transportIndex] = newTransportId;

      await itinerary.save();
      res.status(200).json({ message: 'Transport updated successfully in day plan', itinerary });
    } catch (error) {
      console.error('Error updating transport in day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Remove a Transport from a Day Plan
  removeTransportFromDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, transportId } = req.params;

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      const transportIndex = dayPlan.transports.findIndex(trans => trans.toString() === transportId);
      if (transportIndex === -1) {
        return res.status(404).json({ message: 'Transport not found in day plan' });
      }

      // Remove the transportId from the transports array
      dayPlan.transports.splice(transportIndex, 1);

      await itinerary.save();
      res.status(200).json({ message: 'Transport removed successfully from day plan', itinerary });
    } catch (error) {
      console.error('Error removing transport from day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default ItineraryTransportController;
