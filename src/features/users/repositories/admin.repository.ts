import client from '../../../config/database';
import { AdminUser } from '../interfaces/user-entities.interface';

export const findByEmailAdmin = async (email: string) => {
  const res = await client.query('SELECT * FROM admin_users WHERE email = $1', [email]);
  return res.rows[0];
};

export const createAdmin = async (admin: AdminUser) => {
  await client.query(`
    INSERT INTO admin_users (id, email, password_hash, full_name, is_active, created_at)
    VALUES ($1, $2, $3, $4, $5, NOW())`,
    [admin.id, admin.email, admin.password_hash, admin.full_name, admin.is_active]
  );
};

export const updateAdminActiveStatus = async (email: string, isActive: boolean) => {
  try {
    const result = await client.query(
      'UPDATE admin_users SET is_active = $1 WHERE email = $2 RETURNING *',
      [isActive, email]
    );

    if (result.rowCount === 0) {
      throw new Error(`Admin with email ${email} not found`);
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error updating admin status:', error);
    throw error;
  }
};