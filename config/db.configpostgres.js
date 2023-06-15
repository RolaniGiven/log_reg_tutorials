require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'personalappdb',
  password: process.env.POSTGRES_PASS,
  port: process.env.PORT,
})

//checking if our database is connected to the backend
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
    return;
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      console.error('Error executing query', err.stack);
      return;
    }
    console.log('Connected to the database:', result.rows[0].now);
  });
});

module.exports = pool
