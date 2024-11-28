import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT || '5432', 10), // Number(process.env.DB_PORT)
});

export const Database = {
  checkConnection: async () => {
    const client = await pool.connect();
    await client.query('SELECT 1'); // A simple query to check connection
    client.release();
  },
};
