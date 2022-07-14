import { Schema, model } from 'mongoose';

const MaterialSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  quantity: {
    type: Number,
    default: 0,
  },
  isVisible: {
    type: Boolean,
    default: true,
  },
});

export default model('Material', MaterialSchema);
