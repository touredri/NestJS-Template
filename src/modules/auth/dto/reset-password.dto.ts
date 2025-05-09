import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token de réinitialisation du mot de passe',
    example: 'your_token',
  })
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    description: 'Nouveau mot de passe de l’utilisateur',
    example: 'your_new_password',
  })
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
