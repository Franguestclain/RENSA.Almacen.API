import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env;

const connectionString = NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI;

export const connect = () => mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
  })
  .then(() => console.log('🔌 MongoDB connection successful'))
  .catch(() => console.log('💥 Fail to connect MongoDB'));
