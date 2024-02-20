
import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  type: { 
    type: String, 
    required: true, 
    trim: true,
    enum: ['Trekking', 'Kayaking', 'City Tour', 'Museum Visit', 'Snorkeling'] // Example activity types
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
  deal: {
    type: String,
    trim: true,
    default: 'No deal'
  },
  location: { 
    type: String, 
    required: true, 
    trim: true 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // Consider adding fields such as duration, difficulty level, recommended age, etc.
}, { timestamps: true });

// Index to speed up searches on frequently accessed fields
activitySchema.index({ name: 1, location: 1, type: 1 });

// Middleware to ensure proper casing for the activity name
activitySchema.pre('save', function(next) {
  this.name = this.name.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize names
  next();
});

// Static methods for the Activity model
activitySchema.statics.findActiveActivities = function(callback) {
  // Custom query that finds only active activities
  return this.find({ isActive: true }, callback);
};

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
