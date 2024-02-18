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

const ItineraryHotelController = {
  // Add a Hotel to a Day Plan
 
    addHotelToDayPlan: async (req, res) => {
      const { itineraryId, dayPlanId } = req.params;
      const { hotelId } = req.body; // Assuming hotelId is the ObjectId of the hotel to be added
  
      try {
        // Validate and sanitize hotelData if necessary
        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
          return res.status(400).json({ message: 'Invalid hotel ID' });
        }
  
        const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);
  
        // Add the hotelId to the hotels array of the dayPlan
        dayPlan.hotels.push(hotelId);
  
        await itinerary.save();
        res.status(201).json({ message: 'Hotel added successfully to day plan', itinerary });
      } catch (error) {
        console.error('Error in addHotelToDayPlan:', error);
        res.status(500).json({ message: error.message });
      }
    },
  
  

  updateHotelInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, hotelId } = req.params; // Assuming hotelId is the existing hotel's ID
    const { newHotelId } = req.body; // The new hotel ID to replace the old one
  
    try {
      // Retrieve the itinerary with its day plans populated
      const itinerary = await Itinerary.findById(itineraryId).populate({
        path: 'dayPlans',
        match: { _id: dayPlanId }
      });
  
      // Find the specific day plan
      const dayPlan = itinerary.dayPlans.find(dp => dp._id.toString() === dayPlanId);
      if (!dayPlan) {
        return res.status(404).json({ message: 'Day plan not found' });
      }
  
      // Update the hotel reference if the newHotelId is valid and different from the current
      if (newHotelId && mongoose.Types.ObjectId.isValid(newHotelId) && !dayPlan.hotels.includes(newHotelId)) {
        // Assuming the day plan can have multiple hotels, but we're replacing a specific one
        const hotelIndex = dayPlan.hotels.findIndex(hotel => hotel.toString() === hotelId);
        if (hotelIndex !== -1) {
          dayPlan.hotels[hotelIndex] = newHotelId; // Update the hotel reference
        } else {
          return res.status(404).json({ message: 'Hotel not found in day plan' });
        }
      } else {
        // If the newHotelId is not provided, valid, or already present, no update is needed
        return res.status(400).json({ message: 'Invalid or duplicate new hotel ID' });
      }
  
      // Save the updated itinerary
      await itinerary.save();
      res.status(200).json({ message: 'Hotel updated successfully in day plan', itinerary });
    } catch (error) {
      console.error('Error updating hotel in day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },
  
  
  
  

  // Remove a Hotel from a Day Plan
  removeHotelFromDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, hotelId } = req.params; // Assuming hotelId is the ObjectId of the hotel to be removed
  
    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);
  
      // Find the index of the hotelId in the hotels array
      const hotelIndex = dayPlan.hotels.findIndex(hotel => hotel.toString() === hotelId);
      if (hotelIndex === -1) {
        return res.status(404).json({ message: 'Hotel not found in day plan' });
      }
  
      // Remove the hotelId from the hotels array
      dayPlan.hotels.splice(hotelIndex, 1);
  
      await itinerary.save();
      res.status(200).json({ message: 'Hotel removed successfully from day plan', itinerary });
    } catch (error) {
      console.error('Error removing hotel from day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },
  

}


export default ItineraryHotelController