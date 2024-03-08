import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const noteSchema = new Schema({
  leadId: {
    type: Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Note = model('Note', noteSchema);

export default Note;
