import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'user email adress',
    example: 'your_email@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'user password',
    example: 'your_password',
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  username?: string;
}
