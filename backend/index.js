// backend/index.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Habilitar JSON y CORS
app.use(express.json());
app.use(require('cors')()); // ¡Importante para desarrollo!

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'peopledata',
  password: '24681012',
  port: 5432,
});

// Intentar conectar y mostrar un mensaje en la consola
async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('¡Conexión a PostgreSQL exitosa!');
    const res = await client.query('SELECT NOW()');
    console.log('Hora actual de la base de datos:', res.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error al conectar con PostgreSQL:', err.stack);
  }
}
testConnection();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
