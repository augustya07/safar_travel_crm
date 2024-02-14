// import Itinerary from '../models/Itinerary.js';

// async function addTransport(req, res) {
//     const { itineraryId ,dayPlanId} = req.params;
//     const {transportDetails } = req.body;
  
//     if (!dayPlanId || !transportDetails || !transportDetails.type) {
//       return res.status(400).send('Missing transport details');
//     }
  
//     try {
//       const updateResult = await Itinerary.updateOne(
//         { _id: itineraryId, "dayPlans._id": dayPlanId },
//         { $push: { "dayPlans.$.items": { itemType: 'Transport', ...transportDetails } } }
//       );
  
//       if (updateResult.modifiedCount === 0) {
//         return res.status(404).send('Itinerary or Day Plan not found');
//       }
  
//       res.status(201).send({ message: 'Transport added successfully' });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
  
//   async function updateTransport(req, res) {
//     const { itineraryId, transportId } = req.params;
//     const transportUpdates = req.body;
  
//     // Example validation: Ensure no disallowed fields are being updated
//     const allowedUpdates = ['bookingStatus', 'dates', 'notes'];
//     const isUpdateAllowed = Object.keys(transportUpdates).every(field => allowedUpdates.includes(field));
  
//     if (!isUpdateAllowed) {
//       return res.status(400).send('Invalid update operation');
//     }
  
//     try {
//       const updateResult = await Itinerary.updateOne(
//         { "dayPlans.items._id": transportId },
//         { $set: { "dayPlans.$[dp].items.$[it].metadata": transportUpdates } },
//         { 
//           arrayFilters: [
//             { "dp.items._id": transportId },
//             { "it._id": transportId }
//           ]
//         }
//       );
  
//       if (updateResult.modifiedCount === 0) {
//         return res.status(404).send('Transport not found');
//       }
  
//       res.status(200).send({ message: 'Transport updated successfully' });
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
  
//   async function deleteTransport(req, res) {
//     const { itineraryId, transportId } = req.params;
  
//     try {
//       const updateResult = await Itinerary.updateOne(
//         { "dayPlans.items._id": transportId },
//         { $pull: { "dayPlans.$.items": { _id: transportId } } }
//       );
  
//       if (updateResult.modifiedCount === 0) {
//         return res.status(404).send('Transport not found');
//       }
  
//       res.status(204).send();
//     } catch (error) {
//       res.status(500).send(error.message);
//     }
//   }
  

//   export {addTransport,updateTransport,deleteTransport}

import Itinerary from '../models/Itinerary.js';
import mongoose from 'mongoose';

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
    const transportDetails = req.body; // This should be validated and sanitized

    if (!transportDetails || !transportDetails.itemType) {
      return res.status(400).send('Missing transport details');
    }

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      dayPlan.items.push({
        itemType: 'Transport',
        ...transportDetails
      });

      await itinerary.save();
      res.status(201).json({ message: 'Transport added successfully to day plan', itinerary });
    } catch (error) {
      console.error('Error in addTransportToDayPlan:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Update a Transport in a Day Plan
  updateTransportInDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;
    const transportUpdates = req.body; // This should be validated and sanitized

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      const transportItem = dayPlan.items.find(item => item._id.toString() === itemId && item.itemType === 'Transport');
      if (!transportItem) {
        return res.status(404).json({ message: 'Transport item not found' });
      }

      // Assuming direct assignment is safe for the update fields
      Object.assign(transportItem, transportUpdates);

      await itinerary.save();
      res.status(200).json({ message: 'Transport updated successfully in day plan', itinerary });
    } catch (error) {
      console.error('Error updating transport in day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },

  // Remove a Transport from a Day Plan
  removeTransportFromDayPlan: async (req, res) => {
    const { itineraryId, dayPlanId, itemId } = req.params;

    try {
      const { itinerary, dayPlan } = await findItineraryAndDayPlan(itineraryId, dayPlanId);

      const itemIndex = dayPlan.items.findIndex(item => item._id.toString() === itemId && item.itemType === 'Transport');
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Transport item not found' });
      }

      dayPlan.items.splice(itemIndex, 1);

      await itinerary.save();
      res.status(200).json({ message: 'Transport removed successfully from day plan', itinerary });
    } catch (error) {
      console.error('Error removing transport from day plan:', error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default ItineraryTransportController;
