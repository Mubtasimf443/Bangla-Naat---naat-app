// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import {
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { createHash, randomBytes } from 'crypto';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto, LoginDto, RegisterDto } from './dto/auth.dto';

const VERIFICATION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const RESET_TTL_MS = 60 * 60 * 1000; // 1 hour
const GENERIC_FORGOT_MESSAGE =
  'If an account exists for this email, a link to confirm your new password has been sent.';

@Injectable()
export class AuthService {

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly mail: MailService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    const passwordHash = await bcrypt.hash(dto.password, 12);

    let user = await this.users.findByEmail(email);
    if (user?.isVerified) throw new ConflictException('This email is already registered');

    // An unverified account re-registering just gets updated details and a fresh link.
    user = user
      ? await this.users.updateUnverified(user.id, dto.name, passwordHash)
      : await this.users.create({ name: dto.name, email, password: passwordHash });

    const { token, hash } = this.generateToken();
    await this.users.setVerificationToken(user!.id, hash, new Date(Date.now() + VERIFICATION_TTL_MS));

    try {
      await this.mail.sendVerificationEmail(
        email,
        dto.name,
        `${this.baseUrl()}/api/auth/registration/verification/callback/${token}`,
      );
    } catch (err) {
      throw new ServiceUnavailableException(
        'Could not send the verification email. Please try again later.',
      );
    }

    return { message: 'Registration successful. Please check your email to verify your account.' };
  }

  async verifyRegistration(token: string): Promise<[any, string]> {
    const user = await this.users.verifyByTokenHash(this.hashToken(token));
    if (!user) {
      return [user, ''];
    }
    let accessToken=await this.jwt.signAsync({ sub: user?._id, role : user?.role })
    return [user, accessToken];
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmailWithPassword(dto.email);
    const valid = user ? await bcrypt.compare(dto.password, user.password) : false;
    if (!user || !valid) throw new UnauthorizedException('Invalid email or password');

    if (!user.isVerified) {
      throw new ForbiddenException('Please verify your email before logging in');
    }
    if (user.isBanned) throw new ForbiddenException('Your account has been banned');

    const accessToken = await this.jwt.signAsync({ sub: user._id, role: user.role });
    return {
      accessToken,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.users.findByEmail(dto.email);
    // Same response whether or not the account exists (prevents email enumeration).
    if (!user || !user.isVerified || user.isBanned) return { message: GENERIC_FORGOT_MESSAGE };

    const { token, hash } = this.generateToken();
    const pendingPasswordHash = await bcrypt.hash(dto.newPassword, 12);
    await this.users.setPasswordReset(
      user.id,
      hash,
      pendingPasswordHash,
      new Date(Date.now() + RESET_TTL_MS),
    );

    try {
      await this.mail.sendPasswordResetEmail(
        user.email,
        user.name,
        `${this.baseUrl()}/api/forgot-password/callback/${token}`,
      );
    } catch (err) {
      throw new ServiceUnavailableException('Could not send the email. Please try again later.');
    }

    return { message: GENERIC_FORGOT_MESSAGE };
  }

  async applyPasswordReset(token: string): Promise<boolean> {
    return this.users.applyPasswordReset(this.hashToken(token));
  }

  // ---------- helpers ----------
  private generateToken() {
    const token = randomBytes(32).toString('hex');
    return { token, hash: this.hashToken(token) };
  }

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  private baseUrl() {
    return this.config.getOrThrow<string>('APP_URL').replace(/\/+$/, '');
  }
}
