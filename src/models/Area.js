import { Schema, model } from 'mongoose';

const AreaSchema = new Schema({
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

export default model('Area', AreaSchema);
