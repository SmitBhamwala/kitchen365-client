export interface User {
  id: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
