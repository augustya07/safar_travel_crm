// // models/Service.js

// import mongoose from 'mongoose';

// const serviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   price: { type: Number, required: true },
//   originalPrice: Number,
//   duration: String, // e.g., "1 Night", "Per Couple"
//   location: { type: String, required: true },
//   // Add any other relevant fields here
// }, { timestamps: true });

// const Service = mongoose.model('Service', serviceSchema);
// export default Service;


import mongoose from 'mongoose';

const serviceDurationSchema = new mongoose.Schema({
  value: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  unit: { 
    type: String, 
    required: true, 
    enum: ['Hour', 'Day', 'Night', 'Week', 'Month', 'Year', 'Per Session', 'Per Person', 'Per Couple'], 
    trim: true 
  }
});

const serviceSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  rating: { 
    type: Number, 
    required: true, 
    min: 0, 
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  originalPrice: { 
    type: Number, 
    min: 0 
  },
  duration: serviceDurationSchema,
  location: { 
    type: String, 
    required: true, 
    trim: true 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Consider adding fields such as description, included services, exclusions, etc.
}, { timestamps: true });

// Index to speed up searches on frequently accessed fields
serviceSchema.index({ name: 1, location: 1 });

// Middleware to capitalize the first letter of each word for the service name
serviceSchema.pre('save', function(next) {
  this.name = this.name.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize names
  next();
});

// Static methods for the Service model
serviceSchema.statics.findActiveServices = function(callback) {
  // Custom query that finds only active services
  return this.find({ isActive: true }, callback);
};

const Service = mongoose.model('Service', serviceSchema);
export default Service;
