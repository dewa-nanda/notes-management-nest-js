export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export type UserResponse = Omit<User, 'password'>;

export interface LoginResponse {
  user: UserResponse;
  token: string;
  expiresIn: number;
}
