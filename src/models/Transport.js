// // models/Transport.js

// import mongoose from 'mongoose';

// const transportSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // e.g., "Volvo Bus"
//   rating: { type: Number, required: true },
//   price: { type: Number, required: true },
//   originalPrice: Number,
//   frequency: { type: String, required: true }, // e.g., "1 Bus A Day"
//   route: { type: String, required: true } // e.g., "Mumbai To Goa"
// }, { timestamps: true });

// const Transport = mongoose.model('Transport', transportSchema);
// export default Transport;


import mongoose from 'mongoose';

// Define a subdocument for Route to provide structure
const routeSchema = new mongoose.Schema({
  from: { type: String, required: true, trim: true },
  to: { type: String, required: true, trim: true },
  distance: { type: Number, min: 0 }, // Optional: distance between locations
});

const transportSchema = new mongoose.Schema({
  type: { 
    type: String, 
    required: true, 
    trim: true,
    enum: ['Volvo Bus', 'Private Car', 'Taxi', 'Flight', 'Train', 'Ferry'] // Specify the allowed types
  },
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
  frequency: { 
    type: String, 
    required: true, 
    trim: true,
    validate: {
      validator: function(v) {
        // Simple validation for frequency format "Number + Descriptor"
        return /^\d+\s+\w+\s+(a|per)\s+\w+$/i.test(v);
      },
      message: 'Please enter a valid frequency'
    }
  },
  route: routeSchema, // Use the defined Route subdocument
  isActive: {
    type: Boolean,
    default: true
  },
  // Additional fields could include specific amenities or services provided
}, { timestamps: true });

// Index to speed up searches on frequently accessed fields
transportSchema.index({ 'route.from': 1, 'route.to': 1 });

// Middleware to capitalize first letter of each word for type and route
transportSchema.pre('save', function(next) {
  this.type = this.type.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words
  this.route.from = this.route.from.replace(/\b\w/g, l => l.toUpperCase());
  this.route.to = this.route.to.replace(/\b\w/g, l => l.toUpperCase());
  next();
});

// Static methods for the Transport model
transportSchema.statics.findActiveTransports = function(callback) {
  // Custom query that finds only active transports
  return this.find({ isActive: true }, callback);
};

const Transport = mongoose.model('Transport', transportSchema);
export default Transport;

