import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'Nom d’utilisateur ou email de l’utilisateur',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Mot de passe de l’utilisateur' })
  @IsNotEmpty()
  password: string;
}
