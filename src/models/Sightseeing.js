import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sightseeingSchema = new Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  location: {
    type: String,
    required: true, // Location is a simple string
  },
  images: [{
    type: String, // Array of image URLs
  }],
  description: {
    type: String, // Description is optional
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Sightseeing = model('Sightseeing', sightseeingSchema);

export default Sightseeing;
