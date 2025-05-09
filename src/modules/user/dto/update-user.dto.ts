import { IsOptional, IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Email de l’utilisateur',
    example: 'your_email@gamil.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: 'Nom d’utilisateur',
    example: 'your_username',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'Mot de passe de l’utilisateur',
    example: 'your_password',
  })
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({
    description: 'Rôles de l’utilisateur',
    example: ['admin', 'user'],
  })
  @IsOptional()
  isEmailVerified?: boolean;
}
