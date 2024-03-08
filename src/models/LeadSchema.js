import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const leadSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true },
  source: { type: String, required: true },
  assignedTo: String,
  travelDestination: String,
  fromDate: Date,
  toDate: Date,
  type: String,
  numberOfPax: Number,
}, { timestamps: true });

const Lead = model('Lead', leadSchema);

export default Lead;
