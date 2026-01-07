import { Injectable } from '@nestjs/common';
import {
  RegisterAccountRequest,
  RegisterAccountResponse,
} from './types/interfaces/auth.interface';
import { AuthEntity } from './entity/auth.entity';
import { hashPassword } from '@src/common/helpers/helpers';

@Injectable()
export class AuthService {
  constructor(private authEntity: AuthEntity) {}

  async registerAccount(
    _request: RegisterAccountRequest,
  ): Promise<RegisterAccountResponse> {
    const request = {
      ..._request,
      password: await hashPassword(_request.password),
    };

    const _response = await this.authEntity.createUser(request);

    const response = {
      username: _response.username,
      email: _response.email,
      fullName: _response.fullName,
    };

    return response;
  }
}
