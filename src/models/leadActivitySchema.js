import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const activitySchema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Activity = model('LeadActivity', activitySchema);

export default Activity;
