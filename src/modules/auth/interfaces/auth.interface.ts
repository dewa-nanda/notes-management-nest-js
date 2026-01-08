export interface CreateUserData {
  username: string;
  email: string;
  fullName: string | null;
  password: string;
}

export type ResponseUserData = Omit<CreateUserData, 'password'>;
