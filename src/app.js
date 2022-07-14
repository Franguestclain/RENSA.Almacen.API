import express from 'express';
import {
  MaterialRouter, ClientRouter, ProviderRouter, OrderRouter, AreaRouter,
} from './routes';

const app = express();
app.use(express.json());

app.use('/api/materials', MaterialRouter);
app.use('/api/clients', ClientRouter);
app.use('/api/providers', ProviderRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/areas', AreaRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
