import mongoose from 'mongoose';

// Define schema for the amenities that a hotel might have
const amenitiesSchema = new mongoose.Schema({
  wifi: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  gym: { type: Boolean, default: false },
  // ... other amenities
});

// Define schema for room information
const roomSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  numberOfRooms: { type: Number, required: true, min: 1 },
  guestsPerRoom: { type: Number, required: true, min: 1 },
});


const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  rating: { 
    type: Number, 
    required: true, 
    min: 1, 
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
  amenities: amenitiesSchema,
  imageUrl: { 
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /(^https?:\/\/.*\.(?:png|jpg|jpeg)$)/i.test(v);
      },
      message: 'Please enter a valid image URL'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['2-Star', '3-Star', '4-Star', '5-Star'],
    trim: true 
  },

  mealPlan: {
    type: String,
    required: true,
    enum: ['Breakfast', 'Half Board', 'Full Board', 'All Inclusive', 'No Meals'],
  },
  roomInfo: roomSchema,

}, { timestamps: true });

// Index to speed up searches on frequently accessed fields
hotelSchema.index({ name: 1, location: 1 });

// Middleware to handle actions before saving, like converting names to proper case
hotelSchema.pre('save', function(next) {
  this.name = this.name.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize names
  next();
});

// Static methods for the Hotel model
hotelSchema.statics.findActiveHotels = function(callback) {
  // Custom query that finds only active hotels
  return this.find({ isActive: true }, callback);
};

const Hotel = mongoose.model('Hotel', hotelSchema);
export default Hotel;

