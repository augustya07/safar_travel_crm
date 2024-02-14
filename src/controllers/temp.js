/**
   * Update a transport within a specific day plan of an itinerary.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   */
updateTransportInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;
    const transportData = req.body; // Assume this has been validated and sanitized

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

      // Find the specific day plan
      const dayPlan = itinerary.dayPlans.find(plan => plan.id === dayPlanId);
      if (!dayPlan) {
        return res.status(404).json({ message: 'Day plan not found' });
      }

      // Find the index of the transport item to be updated
      const transportItemIndex = dayPlan.items.findIndex(item => item.itemId.toString() === itemId && item.itemType === 'Transport');
      if (transportItemIndex === -1) {
        return res.status(404).json({ message: 'Transport item not found' });
      }

      // Update the metadata for the transport item
      dayPlan.items[transportItemIndex].metadata = { ...dayPlan.items[transportItemIndex].metadata, ...transportData.metadata };

      // Mark the items array as modified for Mongoose to track the change
      dayPlan.markModified('items');

      await itinerary.save();
      res.status(200).json({ message: 'Transport updated successfully in day plan', updatedTransportItem: dayPlan.items[transportItemIndex] });
    } catch (error) {
      console.error('Error updating transport in day plan:', error);
      res.status(500).json({ message: 'Error updating transport in day plan', error: error.message });
    }
}
