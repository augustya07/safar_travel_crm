
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
