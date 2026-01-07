interface BaseAuth {
  username: string;
  email: string;
  fullName: string | null;
}

export interface RegisterAccountRequest extends BaseAuth {
  password: string;
}

export interface RegisterAccountResponse extends BaseAuth {}
