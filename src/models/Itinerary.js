
import mongoose from 'mongoose';
import itineraryGeneralSchema from './itineraryGeneralSchema.js';
import itineraryAvailabilitySchema from './itineraryAvailabilitySchema.js';
import dayPlanSchema from './dayPlanSchema.js';
import otherDetailSchema from './otherDetailsSchema.js';

// Define the Itinerary schema
const itinerarySchema = new mongoose.Schema({
  general: { type: itineraryGeneralSchema, required: true },
  availability: { type: itineraryAvailabilitySchema, required: true },
  dayPlans: [dayPlanSchema], // Array to hold multiple day plans
  otherDetails: { type: otherDetailSchema, required: true }
}, { timestamps: true });

// Pre-save middleware for additional validations
itinerarySchema.pre('save', function(next) {
  // Ensure the trip's start date is before its end date
  if (this.availability.tripStartDate >= this.availability.tripEndDate) {
    next(new Error('Trip start date must be before the end date.'));
  } else {
    next();
  }
});

// Static method to find itineraries by type
itinerarySchema.statics.findByType = function(type) {
  return this.find({ 'general.itineraryType': type });
};

// Instance method to calculate the total duration of the trip
itinerarySchema.methods.calculateDuration = function() {
  const duration = this.availability.tripEndDate - this.availability.tripStartDate;
  return Math.ceil(duration / (1000 * 60 * 60 * 24)); // Convert duration from milliseconds to days
};

// Apply indexing for optimized query performance
itinerarySchema.index({ 'general.itineraryType': 1, 'availability.tripStartDate': 1, 'availability.tripEndDate': 1 });

    

// Compile and export the Itinerary model
const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
