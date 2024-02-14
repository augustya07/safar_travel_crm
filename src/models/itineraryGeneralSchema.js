// import mongoose from 'mongoose';

// const itineraryGeneralSchema = new mongoose.Schema({
//   itineraryType: {
//     type: String,
//     required: [true, 'Itinerary type is required.'],
//   },
//   headerCoverImage: {
//     type: String,
//     // required: [true, 'Header cover image is required.']
//   },
//   templateTitle: {
//     type: String,
//     required: [true, 'Template title is required.']
//   },
//   description: {
//     type: String,
//     maxlength: [500, 'Description cannot exceed 500 words.']
//   },
//   numberPax: {
//     type: Number,
//     required: [true, 'Number of PAX is required.']
//   },
//   typePax: {
//     type: String,
//     required: [true, 'Type of PAX is required.'],
//   },
//   startingPoint: {
//     type: String,
//     required: [true, 'Starting point is required.']
//   },
//   droppingPoint: {
//     type: String,
//     required: [true, 'Dropping point is required.']
//   },
//   createdBy: {
//     type: String,
//     default: 'Safar Wander Lust'
//   },
//   lastUpdatedBy: {
//     type: String,
//     default: 'Safar Wander Lust'
//   }
// }, { timestamps: true });

// export default  itineraryGeneralSchema;


import mongoose from 'mongoose';

const validateURL = (url) => {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url);
};

const itineraryGeneralSchema = new mongoose.Schema({
  itineraryType: {
    type: String,
    required: [true, 'Itinerary type is required.'],
    enum: ['Family', 'Solo', 'Adventure', 'Romantic', 'Educational'],
    trim: true,
  },
  headerCoverImage: {
    type: String,
    validate: [validateURL, 'Please enter a valid URL.'],
    required: [true, 'Header cover image is required.']
  },
  templateTitle: {
    type: String,
    required: [true, 'Template title is required.'],
    trim: true,
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 words.'],
    trim: true,
  },
  numberPax: {
    type: Number,
    required: [true, 'Number of PAX is required.'],
    min: [1, 'There must be at least one passenger.']
  },
  typePax: {
    type: String,
    required: [true, 'Type of PAX is required.'],
    enum: ['Adult', 'Child', 'Infant'],
    trim: true,
  },
  startingPoint: {
    type: String,
    required: [true, 'Starting point is required.'],
    trim: true,
  },
  droppingPoint: {
    type: String,
    required: [true, 'Dropping point is required.'],
    trim: true,
  },
  createdBy: {
    type: String,
    default: 'Safar Wander Lust',
    trim: true,
  },
  lastUpdatedBy: {
    type: String,
    default: 'Safar Wander Lust',
    trim: true,
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Virtual property for full title
itineraryGeneralSchema.virtual('fullTitle').get(function() {
  return `${this.templateTitle} - ${this.itineraryType}`;
});

// Pre-save middleware for lastUpdatedBy
itineraryGeneralSchema.pre('save', function(next) {
  this.lastUpdatedBy = 'Automatic System Update'; // Adjust according to your application's logic
  next();
});

// Custom instance method: example placeholder
itineraryGeneralSchema.methods.calculateDuration = function() {
  // Placeholder function
};

// Custom static method to find itineraries by creator
itineraryGeneralSchema.statics.findByCreator = function(creatorName) {
  return this.find({ createdBy: creatorName });
};

// Index for performance optimization
itineraryGeneralSchema.index({ itineraryType: 1, startingPoint: 1, droppingPoint: 1 });

export default itineraryGeneralSchema;
