import { Sequelize } from 'sequelize';

// Asegúrate de que las variables de entorno estén configuradas en el archivo .env
const connection = new Sequelize({
  dialect: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

async function testConnection() {
  try {
    await connection.authenticate();
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

testConnection();

export { connection };

// import { Sequelize, } from 'sequelize';
// import './src/database/connection.js';


// const connection = new Sequelize({
//   dialect: 'mysql', // mysql
//   host: process.env.DATABASE_HOST,
//   port: +process.env.DATABASE_PORT,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
// });

// try {
//   connection
//     .authenticate()
//     .then(() => console.log('Conectado a base de datos'));
// } catch (err) {
//   console.error(err);
// }

// export { connection, };