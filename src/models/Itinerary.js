
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
  otherDetails: { type: otherDetailSchema, required: true },
  calculatedPrice: {
    total: Number,
    breakdown: {
      accommodationCost: Number,
      transportCost: Number,
      activityCost: Number,
      serviceCost: Number,
      sightseeingCost: Number
    },
    lastCalculated: Date
  }
}, { timestamps: true });

// Method to calculate total price
itinerarySchema.methods.calculateTotalPrice = async function() {
  // Populate all price-related fields at once
  await this.populate([
    'dayPlans.hotels',
    'dayPlans.transports',
    'dayPlans.activities',
    'dayPlans.services',
    'dayPlans.sightseeing'
  ]);

  let breakdown = {
    accommodationCost: 0,
    transportCost: 0,
    activityCost: 0,
    serviceCost: 0,
    sightseeingCost: 0
  };

  // Calculate costs from each day plan
  for (const dayPlan of this.dayPlans) {
    breakdown.accommodationCost += dayPlan.hotels.reduce((sum, hotel) => sum + (hotel.price || 0), 0);
    breakdown.transportCost += dayPlan.transports.reduce((sum, transport) => sum + (transport.price || 0), 0);
    breakdown.activityCost += dayPlan.activities.reduce((sum, activity) => sum + (activity.price || 0), 0);
    breakdown.serviceCost += dayPlan.services.reduce((sum, service) => sum + (service.price || 0), 0);
    breakdown.sightseeingCost += dayPlan.sightseeing.reduce((sum, sight) => sum + (sight.price || 0), 0);
  }

  // Calculate total
  const total = Object.values(breakdown).reduce((sum, cost) => sum + cost, 0);

  // Update the document
  this.calculatedPrice = {
    total,
    breakdown,
    lastCalculated: new Date()
  };

  return this.calculatedPrice;
};

// Middleware to auto-calculate price before saving
itinerarySchema.pre('save', async function(next) {
  // Only calculate if dayPlans have been modified or it's a new document
  if (this.isNew || this.isModified('dayPlans')) {
    await this.calculateTotalPrice();
  }
  next();
});

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
