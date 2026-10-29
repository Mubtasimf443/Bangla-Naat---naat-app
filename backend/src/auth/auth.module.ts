// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthController, ForgotPasswordController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule],
  controllers: [AuthController, ForgotPasswordController],
  providers: [AuthService],
})
export class AuthModule {}
