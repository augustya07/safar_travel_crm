
// import mongoose from 'mongoose';

// const includesSchema = new mongoose.Schema({
//   title: String

// });

// const excludesSchema = new mongoose.Schema({
//   title: String
// });

// const otherDetailSchema = new mongoose.Schema({
//   includes: [includesSchema],
//   excludes: [excludesSchema],
//   termsAndConditions: String,
//   cancellationConditions: String,
//   passportVisas: String,
//   travelInsurance: String,
//   medicalAdvice: String,
// }, { timestamps: true });


// export default  otherDetailSchema


import mongoose from 'mongoose';

// Refining includes and excludes schema with more structure and validation
const detailItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required.'],
    trim: true, // Removes leading and trailing whitespace
  }
});

const otherDetailSchema = new mongoose.Schema({
  includes: [detailItemSchema], // Use the refined schema for includes
  excludes: [detailItemSchema], // Use the same refined schema for excludes
  termsAndConditions: {
    type: String,
    required: [true, 'Terms and conditions are required.'],
    trim: true,
  },
  cancellationConditions: {
    type: String,
    required: [true, 'Cancellation conditions are required.'],
    trim: true,
  },
  passportVisas: {
    type: String,
    required: [true, 'Passport and visa information is required.'],
    trim: true,
  },
  travelInsurance: {
    type: String,
    required: [true, 'Travel insurance information is required.'],
    trim: true,
  },
  medicalAdvice: {
    type: String,
    required: [true, 'Medical advice is required.'],
    trim: true,
  }
}, { timestamps: true });

// Adding index for better search performance on frequently queried fields
// otherDetailSchema.index({ 'includes.title': 1, 'excludes.title': 1 });

otherDetailSchema.index({ 'includes.title': 1 });
otherDetailSchema.index({ 'excludes.title': 1 });


// Example of pre-save middleware for additional validation or modification
otherDetailSchema.pre('save', function(next) {
  // Example: Automatically append additional information to terms and conditions
  this.termsAndConditions += " Please ensure to read all conditions carefully.";
  next();
});

export default otherDetailSchema;
