
// import mongoose from 'mongoose';

// const itemSchema = new mongoose.Schema({
//   itemType: { type: String, enum: ['Hotel', 'Transport', 'Activity', 'Service'], required: true },
//   itemId: { type: mongoose.Schema.Types.ObjectId, required: true }, // References the specific item by ID
//   // Add any other fields that are common to all items if needed
// });

// const dayPlanSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   location: { type: String, required: true },
//   coverImage: { type: String, required: true }, // This could be a URL to the image
//   items: [itemSchema], // This array holds the various items (hotels, transportations, etc.)
// }, { timestamps: true });

// export default dayPlanSchema;

// models/DayPlan.js

import mongoose from 'mongoose';

const itemMetadataSchema = new mongoose.Schema({
  bookingStatus: { type: String, enum: ['Booked', 'Pending', 'Cancelled'], default: 'Pending' },
  dates: [Date],
  notes: String,
  // Any other relevant fields
});

const itemSchema = new mongoose.Schema({
  itemType: { type: String, enum: ['Hotel', 'Transport', 'Activity', 'Service'], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'items.itemType' },
  metadata: itemMetadataSchema,
});

const dayPlanSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  coverImage: {
    type: String, 
    // required: true,
    validate: {
      validator: function(v) {
        return /(^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$)/i.test(v);
      },
      message: 'Please enter a valid image URL'
    }
  },
  items: [itemSchema],
}, { timestamps: true });

export default dayPlanSchema;
