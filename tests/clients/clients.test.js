import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../../src/app';
import { connect } from '../../src/database';
import Client from '../../src/models/Client';
import { initialClients } from './client-data';

describe('Client endpoints', () => {
  let api = null;
  let server = null;

  beforeAll(async () => {
    api = supertest(app);
    server = app.listen(process.env.PORT);
    await connect();
  });

  beforeEach(async () => {
    await Client.deleteMany({});

    const client = new Client(initialClients[0]);
    await client.save();

    const client2 = new Client(initialClients[1]);
    await client2.save();

    const client3 = new Client(initialClients[2]);
    await client3.save();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  // it('should be the same text', () => {
  //   expect('Hola').toBe('Hola');
  // });

  it('should return data as json', async () => {
    await api
      .get('/api/clients')
      .expect(200)
      .expect('Content-type', /application\/json/);
  });

  it('should return 2 visible clients', async () => {
    const response = await api.get('/api/clients');
    expect(response.body).toHaveLength(initialClients.filter((c) => c.isVisible).length);
  });

  it('should have "Cliente 1"', async () => {
    const response = await api.get('/api/clients');
    const clientes = response.body.map((c) => c.name);
    expect(clientes).toContain('Cliente 1');
  });
});
