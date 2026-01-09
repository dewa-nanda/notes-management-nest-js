import { User } from '@prisma/client';

export type CreateUserInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type LoginInput = Pick<User, 'username' | 'password'>;
export type UserResponse = Omit<User, 'password'>;

export interface LoginResponse {
  user: UserResponse;
  token: string;
  expiresIn: number;
}
