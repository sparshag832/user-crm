import pool from '../config/db.js';

export const User = {
  id: 'SERIAL PRIMARY KEY',
  username: 'VARCHAR(50) UNIQUE NOT NULL',
  email: 'VARCHAR(100) UNIQUE NOT NULL',
  password: 'VARCHAR(255) NOT NULL',
  created_at: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
};

export const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id ${User.id},
      username ${User.username},
      email ${User.email},
      password ${User.password},
      created_at ${User.created_at}
    );
  `;
  try {
    await pool.query(query);
    console.log('Table Created Succesfully');
  } catch (err) {
    console.error('Error In Creating User Table', err.message);
  }
};

export const createUser = async ({ username, email, password }) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;
  `;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

export const findUserByUsername = async (username) => {
  const query = `SELECT * FROM users WHERE username = $1 LIMIT 1`;
  const result = await pool.query(query, [username]);
  return result.rows[0];
};
