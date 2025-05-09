import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({
    description: 'Token de vérification de l’email',
    example: 'your_token',
  })
  @IsNotEmpty()
  token: string;
}
