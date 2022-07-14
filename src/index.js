import * as dotenv from 'dotenv';
import app from './app';
import { connect } from './database';

dotenv.config();

const main = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto ${process.env.PORT}`);
  });

  connect();
};

main();
