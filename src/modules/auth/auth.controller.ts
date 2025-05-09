import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  // ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Enregistrer un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé et email de vérification envoyé.',
  })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Connexion (obtention des tokens)' })
  @ApiResponse({ status: 200, description: 'Tokens JWT access et refresh.' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'Demander une réinitialisation de mot de passe' })
  @ApiResponse({
    status: 200,
    description: 'Email de réinitialisation envoyé si l’utilisateur existe.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilisateur non trouvé.',
  })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Réinitialiser le mot de passe' })
  @ApiResponse({
    status: 200,
    description: 'Mot de passe réinitialisé avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Token invalide ou expiré.',
  })
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @ApiOperation({ summary: 'Vérifier l’email d’un utilisateur' })
  // @ApiBearerAuth('access-token')
  @ApiResponse({
    status: 200,
    description: 'Email vérifié avec succès.',
  })
  @ApiResponse({
    status: 400,
    description: 'Token invalide ou expiré.',
  })
  @Post('verify-email')
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(verifyEmailDto);
  }
}
