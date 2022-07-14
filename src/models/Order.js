import { Schema, model } from 'mongoose';
import { ClientSchema } from './Client';
import { ProviderSchema } from './Provider';

const OrderMaterialsSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  ot: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  client: ClientSchema,
  requestedArea: {
    type: Schema.Types.ObjectId,
    ref: 'Area',
  },
  price: {
    type: Number,
    default: 0,
  },
  provider: ProviderSchema,
  priority: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW'],
    default: 'LOW',
  },
});

const OrderSchema = new Schema({
  orderId: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  materials: [OrderMaterialsSchema],
});

export default model('Order', OrderSchema);
