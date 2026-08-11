export interface LoginRequest {
  email: string;
  password?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
}

export interface User {
  id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role?: string;
}
