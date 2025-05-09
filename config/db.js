import postgres from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.dev' });

const {Pool}=postgres;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
 export default pool;