import { Schema, model } from 'mongoose';

export const ProviderSchema = new Schema({
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

export default model('Provider', ProviderSchema);
