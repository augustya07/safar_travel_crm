import Itinerary from '../models/Itinerary.js';

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
    const hotelData = req.body; // This should be validated and sanitized

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      dayPlan.items.push({
        itemType: 'Hotel',
        itemId: hotelData.hotelId, // Assume hotelId is valid and exists
        metadata: hotelData.metadata // Include bookingStatus, dates, notes, etc.
      });

      await itinerary.save();
      res.status(201).json({ message: 'Hotel added successfully to day plan', itinerary });
    } catch (error) {
      console.error('Error in addHotelToDayPlan:', error);
      res.status(500).json({ message: error.message });
    }
  },

  updateHotelInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;
    const { hotelId, metadata } = req.body; // Destructuring to get hotelId and metadata from the request body
  
    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);
  
      const hotelItem = dayPlan.items.find(item => item._id.toString() === itemId && item.itemType === 'Hotel');
      if (!hotelItem) {
        return res.status(404).json({ message: 'Hotel item not found' });
      }
  
      // Update the hotel metadata
      hotelItem.metadata = { ...hotelItem.metadata, ...metadata };
  
      // Check if a new hotelId (itemId) is provided and validate it
    //   if (hotelId && mongoose.Types.ObjectId.isValid(hotelId)) {
        hotelItem.itemId = hotelId; // Update the itemId with the new hotelId
    //   }
  
      await itinerary.save();
      res.status(200).json({ message: 'Hotel updated successfully in day plan', itinerary });
    } catch (error) {
      console.error('Error updating hotel in day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },
  
  
  

  // Remove a Hotel from a Day Plan
  removeHotelFromDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      const itemIndex = dayPlan.items.findIndex(item => item._id.toString() === itemId && item.itemType === 'Hotel');
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Hotel item not found' });
      }

      dayPlan.items.splice(itemIndex, 1);

      await itinerary.save();
      res.status(200).json({ message: 'Hotel removed successfully from day plan', itinerary });
    } catch (error) {
      console.error('Error removing hotel from day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },

}


export default ItineraryHotelController