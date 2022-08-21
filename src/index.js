import * as dotenv from 'dotenv';
import { connect } from './database';
import app from './app';

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
});

connect();
