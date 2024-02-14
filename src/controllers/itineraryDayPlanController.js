// Import necessary dependencies and schema components
import Itinerary from '../models/Itinerary.js';
import mongoose from 'mongoose';

const ItineraryController = {
  /**
   * Create a new itinerary with initial data.
   * @param {Object} req - The request object containing the itinerary data.
   * @param {Object} res - The response object.
   */
  createItinerary: async (req, res) => {
    try {
      // Validation and sanitization of the request body should be implemented here.
      const itineraryData = req.body; // Assuming request body contains sanitized and validated itinerary data
      const newItinerary = new Itinerary(itineraryData);
      await newItinerary.save();
      res.status(201).json({ message: 'Itinerary created successfully', itinerary: newItinerary });
    } catch (error) {
      console.error('Error creating itinerary:', error);
      res.status(400).json({ message: 'Error creating itinerary', error: error.message });
    }
  },

  /**
 * Add a new day plan to an existing itinerary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
addDayPlan: async (req, res) => {
    const { itineraryId } = req.params;
    const dayPlanData = req.body; // Assume this has been validated and sanitized
  
    try {
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      itinerary.dayPlans.push(dayPlanData);
      await itinerary.save();
      res.status(201).json({ message: 'Day plan added successfully', itinerary });
    } catch (error) {
      console.error('Error adding day plan:', error);
      res.status(500).json({ message: 'Error adding day plan', error: error.message });
    }
  },
  
  /**
   * Remove a day plan from an existing itinerary.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  removeDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId } = req.params;
  
    try {
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      // Find the day plan by id and remove it
      const dayPlanIndex = itinerary.dayPlans.findIndex(plan => plan.id === dayPlanId);
      if (dayPlanIndex === -1) {
        return res.status(404).json({ message: 'Day plan not found' });
      }
  
      itinerary.dayPlans.splice(dayPlanIndex, 1);
      await itinerary.save();
      res.status(200).json({ message: 'Day plan removed successfully', itinerary });
    } catch (error) {
      console.error('Error removing day plan:', error);
      res.status(500).json({ message: 'Error removing day plan', error: error.message });
    }
  },

  /**
 * Update an existing day plan within an itinerary.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
updateDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId } = req.params;
    const { title, description, location, coverImage } = req.body;
  
    // Validation (You can extend this with more sophisticated validation logic if necessary)
    if (!title || !description || !location) {
      return res.status(400).json({ message: 'Title, description, and location are required.' });
    }
  
    if (coverImage && !(/(^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$)/i.test(coverImage))) {
      return res.status(400).json({ message: 'Please enter a valid image URL.' });
    }
  
    // Sanitization (Trim whitespace from the strings)
    const sanitizedTitle = title.trim();
    const sanitizedDescription = description.trim();
    const sanitizedLocation = location.trim();
    const sanitizedCoverImage = coverImage ? coverImage.trim() : '';
  
    try {
      const itinerary = await Itinerary.findById(itineraryId);
      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      // Find the index of the day plan to be updated
      const dayPlanIndex = itinerary.dayPlans.findIndex(plan => plan.id === dayPlanId);
      if (dayPlanIndex === -1) {
        return res.status(404).json({ message: 'Day plan not found' });
      }
  
      // Update the day plan with sanitized data
      const dayPlanToUpdate = itinerary.dayPlans[dayPlanIndex];
      dayPlanToUpdate.title = sanitizedTitle;
      dayPlanToUpdate.description = sanitizedDescription;
      dayPlanToUpdate.location = sanitizedLocation;
      dayPlanToUpdate.coverImage = sanitizedCoverImage;
  
      // Mark the dayPlans array as modified for Mongoose to track the change
      itinerary.markModified('dayPlans');
  
      await itinerary.save();
      res.status(200).json({ message: 'Day plan updated successfully', dayPlan: dayPlanToUpdate });
    } catch (error) {
      console.error('Error updating day plan:', error);
      res.status(500).json({ message: 'Error updating day plan', error: error.message });
    }
  },
  

  /**
   * Update a hotel within a specific day plan of an itinerary.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
  updateHotelInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;
    const hotelData = req.body; // Assume this has been validated and sanitized

    if (!mongoose.Types.ObjectId.isValid(itineraryId) || 
        !mongoose.Types.ObjectId.isValid(dayPlanId) || 
        !mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
      const itinerary = await Itinerary.findById(itineraryId);

      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }

      const dayPlan = itinerary.dayPlans.find(plan => plan.id === dayPlanId);
      if (!dayPlan) {
        return res.status(404).json({ message: 'Day plan not found' });
      }

      // Find the index of the hotel item to be updated
      const hotelItemIndex = dayPlan.items.findIndex(item => item.itemId.toString() === itemId && item.itemType === 'Hotel');
      if (hotelItemIndex === -1) {
        return res.status(404).json({ message: 'Hotel item not found' });
      }

      // Update the metadata for the hotel item
      dayPlan.items[hotelItemIndex].metadata = { ...dayPlan.items[hotelItemIndex].metadata, ...hotelData.metadata };

      // Mark the items array as modified for Mongoose to track the change
      dayPlan.markModified('items');

      await itinerary.save();
      res.status(200).json({ message: 'Hotel updated successfully in day plan', updatedHotelItem: dayPlan.items[hotelItemIndex] });
    } catch (error) {
      console.error('Error updating hotel in day plan:', error);
      res.status(500).json({ message: 'Error updating hotel in day plan', error: error.message });
    }
}
,


  
  // Additional methods for fetching, updating, and deleting itineraries can be added here.
  // Ensure each method includes proper validation, sanitization, error handling, and documentation.

};

export default ItineraryController;
