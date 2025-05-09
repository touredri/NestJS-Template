// import { PartialType } from '@nestjs/swagger';
// import { CreateUserDto } from './create-user.dto';

import { IsOptional, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  isEmailVerified?: boolean;
}
