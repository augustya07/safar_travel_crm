// import mongoose from 'mongoose';

// const itineraryAvailabilitySchema = new mongoose.Schema({
//   tripStartDate: {
//     type: Date,
//     required: [true, 'Trip start date is required.']
//   },
//   tripEndDate: {
//     type: Date,
//     required: [true, 'Trip end date is required.']
//   },
//   prices: {
//     adult: {
//       type: Number,
//       required: [true, 'Adult price is required.']
//     },
//     children: {
//       type: Number,
//       required: [true, 'Children price is required.']
//     },
//     infant: {
//       type: Number,
//       required: [true, 'Infant price is required.']
//     }
//   }

// });

// export default itineraryAvailabilitySchema;
 

import mongoose from 'mongoose';

// Function to validate that the trip's end date is after the start date
const validateTripDates = function() {
  // `this` refers to the current document
  return this.tripEndDate > this.tripStartDate;
};

const itineraryAvailabilitySchema = new mongoose.Schema({
  tripStartDate: {
    type: Date,
    required: [true, 'Trip start date is required.'],
    min: [new Date(), 'Trip start date cannot be in the past.'], // Ensure start date is not in the past
  },
  tripEndDate: {
    type: Date,
    required: [true, 'Trip end date is required.'],
    validate: [validateTripDates, 'Trip end date must be after the start date.'], // Custom validation
  },
  prices: {
    adult: {
      type: Number,
      required: [true, 'Adult price is required.'],
      min: [0, 'Adult price cannot be negative.'], // Ensure price is not negative
    },
    children: {
      type: Number,
      required: [true, 'Children price is required.'],
      min: [0, 'Children price cannot be negative.'], // Ensure price is not negative
    },
    infant: {
      type: Number,
      required: [true, 'Infant price is required.'],
      min: [0, 'Infant price cannot be negative.'], // Ensure price is not negative
    }
  }
}, { timestamps: true });

// Pre-save middleware to validate trip date range
itineraryAvailabilitySchema.pre('save', function(next) {
  if (this.tripEndDate <= this.tripStartDate) {
    next(new Error('Trip end date must be after the start date.'));
  } else {
    next();
  }
});

// Post-save middleware example
itineraryAvailabilitySchema.post('save', function(doc, next) {
  console.log(`New trip availability saved for trip starting on ${doc.tripStartDate}`);
  next();
});

// Static method to find itineraries by date range
itineraryAvailabilitySchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    tripStartDate: { $gte: startDate },
    tripEndDate: { $lte: endDate }
  });
};

// Instance method to get trip duration in days
itineraryAvailabilitySchema.methods.getTripDuration = function() {
  const duration = this.tripEndDate - this.tripStartDate;
  return Math.ceil(duration / (1000 * 60 * 60 * 24)); // Convert duration from milliseconds to days
};

// Index for performance optimization
itineraryAvailabilitySchema.index({ tripStartDate: 1, tripEndDate: 1 });

export default itineraryAvailabilitySchema;
