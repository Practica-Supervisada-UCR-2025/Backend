export interface BaseUser {
  id: string;
  email: string;
  password_hash: string;
  full_name: string;
  is_active: boolean;
  created_at: Date;
  last_login: Date | null;
}

export interface User extends BaseUser {
  username: string;
  profile_picture: string;
  role: string;
}

export interface AdminUser extends BaseUser {
  // solo lo hereda sin necesidad de más campos
}