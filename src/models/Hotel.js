// // models/Hotel.js

// import mongoose from 'mongoose';

// const hotelSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   rating: { type: Number, required: true },
//   price: { type: Number, required: true },
//   originalPrice: Number,
//   deal: String,
//   location: { type: String, required: true },
// //   amenities: [String], // Assuming hotels have amenities listed
//   imageUrl: { type: String } // Assuming there's an image for each hotel
// }, { timestamps: true });

// const Hotel = mongoose.model('Hotel', hotelSchema);
// export default Hotel;

import mongoose from 'mongoose';

// Define schema for the amenities that a hotel might have
const amenitiesSchema = new mongoose.Schema({
  wifi: { type: Boolean, default: false },
  pool: { type: Boolean, default: false },
  parking: { type: Boolean, default: false },
  gym: { type: Boolean, default: false },
  // ... other amenities
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
  // You may want to add more fields that are relevant to your application
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

