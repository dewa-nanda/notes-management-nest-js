import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(12)
  password: string;

  @IsOptional()
  fullName: string;
}
