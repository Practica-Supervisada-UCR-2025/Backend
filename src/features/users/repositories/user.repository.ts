import client from '../../../config/database';
import { User } from '../interfaces/user-entities.interface';

export const findByEmailUser = async (email: string) => {
  const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rows[0];
};

export const createUser = async (user: User) => {
  await client.query(`
    INSERT INTO users (id, email, password_hash, full_name, username, is_active, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
    [user.id, user.email, user.password_hash, user.full_name, user.username, user.is_active]
  );
};

export const updateUserActiveStatus = async (email: string, isActive: boolean) => {
  try {
    const result = await client.query(
      'UPDATE users SET is_active = $1 WHERE email = $2 RETURNING *',
      [isActive, email]
    );

    if (result.rowCount === 0) {
      throw new Error(`User with email ${email} not found`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};