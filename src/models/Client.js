import { Schema, model } from 'mongoose';

export const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export default model('Client', ClientSchema);
