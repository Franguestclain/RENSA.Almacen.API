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
  inventoryItem: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: false,
  },
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'FINISHED'],
    default: 'PENDING',
  },
});

const OrderSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  materials: [OrderMaterialsSchema],
  status: {
    type: String,
    enum: ['PENDING', 'IN_PROGRESS', 'FINISHED'],
    default: 'PENDING',
  },
});

OrderSchema.pre('save', async (next) => {
  const isInProgress = this.materials.some((m) => m.status === 'IN_PROGRESS');
  const everyIsFinished = this.materials.every((m) => m.status === 'FINISHED');

  if (everyIsFinished) {
    this.status = 'FINISHED';
    next();
  } else if (isInProgress) {
    this.status = 'IN_PROGRESS';
    next();
  }
});

export default model('Order', OrderSchema);
