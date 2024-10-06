import 'dotenv/config';

import http from 'http';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import './database/connection.js';

import { auth, } from './middlewares/auth.middleware.js';

// Paso 2. Importar nuestro modulo.
import authRouter from './routes/auth.routes.js';
import hotelRouter from './routes/hotel.routes.js';
import usersRouter from './routes/users.routes.js';
import searchRouter from './routes/search.routes.js';
import reservationRouter from './routes/reservation.routes.js';
import backofficeRouter from './routes/backoffice.routes.js';

async function main() {
  const port = +process.env.APP_PORT ?? 4000;
  const app = express();

  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  // Definir un middleware a nivel global.
  // app.use(auth);

  app.get('/', (req, res) => {
    res.send('Hola mundo!');
  });

  app.use('/auth', authRouter);
  app.use('/hotels', hotelRouter);
  app.use('/search', searchRouter);
  // Anadir el middleware en el router que necesitamos.
  app.use('/users', auth, usersRouter);
  app.use(
    '/reservations', 
    auth,
    reservationRouter
  );
  app.use('/backoffice', auth, backofficeRouter);

  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log('Server running on port: ', port);
  });
}

main()
  .catch(err => console.error(err));