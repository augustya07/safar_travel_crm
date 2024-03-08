import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const followUpSchema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Postponed'],
    default: 'Scheduled'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  },
  outcome: {
    type: String,
    enum: ['Successful', 'Failed', 'Rescheduled', 'No Answer'],
    default: 'Successful'
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

export default model('FollowUp', followUpSchema);
