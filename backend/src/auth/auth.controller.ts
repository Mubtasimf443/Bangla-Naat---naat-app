// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiProduces, ApiTags } from '@nestjs/swagger';
import { type Response } from 'express';
import { htmlPage } from '../common/utils/text.util';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, RegisterDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('registration')
  @ApiOperation({ summary: 'Register a new user and send a verification link by email' })
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Get('registration/verification/callback/:token')
  @ApiOperation({ summary: 'Verify registration (opened from the link in the email)' })
  @ApiProduces('text/html')
  async verify(@Param('token') token: string, @Res() res:Response) {
    const [user, accessToken] = await this.auth.verifyRegistration(token);
    if (user) return res.redirect('banglanaat://registration-success?status=success&token=' + accessToken);
    else return res.redirect('banglanaat://registration-success?status=failed')
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login and receive a JWT access token' })
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  
  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Request a password change: send email + new password, then confirm via emailed link',
  })
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.auth.forgotPassword(dto);
  }

  @Get('forgot-password/callback/:token')
  @ApiOperation({ summary: 'Confirm the new password (opened from the link in the email)' })
  @ApiProduces('text/html')
  async callback(@Param('token') token: string, @Res() res: Response) {
    const ok = await this.auth.applyPasswordReset(token);
    return res
      .status(ok ? 200 : 400)
      .type('html')
      .send(
        ok
          ? htmlPage('Password updated', 'Your new password is set. You can go back to the app and log in.', true)
          : htmlPage('Link invalid or expired', 'This link is invalid, expired or already used. Please request a new password change from the app.', false),
      );
  }
}


