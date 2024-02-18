
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
import { Schema } from 'mongoose';


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
  hotels: [{ type: Schema.Types.ObjectId, ref: 'Hotel' }],
  transports: [{ type: Schema.Types.ObjectId, ref: 'Transport' }],
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }],
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
  sightseeing: [{ type: Schema.Types.ObjectId, ref: 'Sightseeing' }],
}, { timestamps: true });

export default dayPlanSchema;
