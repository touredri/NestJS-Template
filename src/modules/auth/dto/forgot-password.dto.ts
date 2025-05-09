import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({
    description:
      'Email de l’utilisateur pour lequel on souhaite réinitialiser le mot de passe',
    example: 'your_email@gmail.com',
  })
  @IsEmail()
  email: string;
}
