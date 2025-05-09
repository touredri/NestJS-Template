/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../../config/config.service';

import { MailerService } from '../../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ id: number; username: string; roles: string[] } | null> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user: { id: number; username: string; roles: string[] } | null =
      await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
      }),
    };
  }

  async register(registerDto: RegisterDto) {
    const existing = await this.usersService.findOneByEmail(registerDto.email);
    if (existing) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      roles: ['user'],
      isEmailVerified: false,
    });
    // Create email verification token
    const emailToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: this.configService.get('EMAIL_VERIFICATION_SECRET'),
        expiresIn: '1d',
      },
    );
    // Send verification email
    await this.mailerService.sendVerificationEmail(user.email, emailToken);
    return { user, message: 'Verification email sent' };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findOneByEmail(
      forgotPasswordDto.email,
    );
    if (!user) {
      throw new BadRequestException('User not found');
    }
    // Create reset token
    const resetToken = this.jwtService.sign(
      { sub: user.id, email: user.email },
      {
        secret: this.configService.get('RESET_PASSWORD_SECRET'),
        expiresIn: '1h',
      },
    );
    // Send reset password email
    await this.mailerService.sendResetPasswordEmail(user.email, resetToken);
    return { message: 'Password reset email sent' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    let payload: Payload;
    try {
      payload = this.jwtService.verify(resetPasswordDto.token, {
        secret: this.configService.get('RESET_PASSWORD_SECRET'),
      });
    } catch (err) {
      console.log('error: ', err);
      throw new BadRequestException('Invalid or expired token');
    }
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
    await this.usersService.update(user.id, { password: hashedPassword });
    return { message: 'Password reset successful' };
  }

  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    let payload: Payload;
    try {
      payload = this.jwtService.verify(verifyEmailDto.token, {
        secret: this.configService.get('EMAIL_VERIFICATION_SECRET'),
      });
    } catch (err) {
      console.log('error: ', err);
      throw new BadRequestException('Invalid or expired token');
    }
    await this.usersService.update(payload.sub, { isEmailVerified: true });
    return { message: 'Email successfully verified' };
  }
}

interface Payload {
  username: string;
  sub: number;
  roles: string[];
}
