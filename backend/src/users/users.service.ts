// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Role } from '../common/enums/role.enum';
import { buildMeta, PaginatedResult } from '../common/dto/pagination.dto';
import { escapeRegex } from '../common/utils/text.util';
import { QueryUsersDto } from './dto/query-users.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly config: ConfigService,
  ) {}

  /** Creates the first admin from ADMIN_EMAIL / ADMIN_PASSWORD if it does not exist yet. */
  async onModuleInit() {
    const email = this.config.get<string>('ADMIN_EMAIL')?.toLowerCase();
    const password = this.config.get<string>('ADMIN_PASSWORD');
    if (!email || !password) return;

    const exists = await this.userModel.exists({ email });
    if (exists) return;

    await this.userModel.create({
      name: this.config.get<string>('ADMIN_NAME', 'Admin'),
      email,
      password: await bcrypt.hash(password, 12),
      role: Role.ADMIN,
      isVerified: true,
    });
    this.logger.log(`Seeded admin account: ${email}`);
  }

  create(data: { name: string; email: string; password: string }) {
    return this.userModel.create(data);
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  findByEmailWithPassword(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase() }).select('+password').exec();
  }

  async findPaginated(query: QueryUsersDto): Promise<PaginatedResult<UserDocument>> {
    const { page, limit, search, role } = query;
    const filter: Record<string, any> = {};
    if (role) filter.role = role;
    if (search) {
      const rx = new RegExp(escapeRegex(search.trim()), 'i');
      filter.$or = [{ name: rx }, { email: rx }];
    }
    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.userModel.countDocuments(filter),
    ]);
    return { data, meta: buildMeta(total, page, limit) };
  }

  setBanned(id: string, isBanned: boolean) {
    return this.userModel.findByIdAndUpdate(id, { isBanned }, { new: true }).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  updateUnverified(id: string, name: string, passwordHash: string) {
    return this.userModel
      .findByIdAndUpdate(id, { name, password: passwordHash }, { new: true })
      .exec();
  }

  // ---------- email verification ----------
  setVerificationToken(id: string, tokenHash: string, expires: Date) {
    return this.userModel
      .updateOne(
        { _id: id },
        { verificationTokenHash: tokenHash, verificationTokenExpires: expires },
      )
      .exec();
  }

  /** Atomically verifies the user that owns this (unexpired) token. */
  verifyByTokenHash(tokenHash: string) {
    return this.userModel
      .findOneAndUpdate(
        { verificationTokenHash: tokenHash, verificationTokenExpires: { $gt: new Date() } },
        {
          $set: { isVerified: true },
          $unset: { verificationTokenHash: '', verificationTokenExpires: '' },
        }
      );
  }

  // ---------- forgot password ----------
  setPasswordReset(id: string, tokenHash: string, pendingPasswordHash: string, expires: Date) {
    return this.userModel
      .updateOne(
        { _id: id },
        {
          passwordResetTokenHash: tokenHash,
          pendingPasswordHash,
          passwordResetExpires: expires,
        },
      )
      .exec();
  }

  /** Applies the pending password for the user that owns this (unexpired) token. */
  async applyPasswordReset(tokenHash: string): Promise<boolean> {
    const user = await this.userModel
      .findOne({ passwordResetTokenHash: tokenHash, passwordResetExpires: { $gt: new Date() } })
      .select('+pendingPasswordHash')
      .exec();
    if (!user || !user.pendingPasswordHash) return false;

    user.password = user.pendingPasswordHash;
    user.pendingPasswordHash = undefined;
    user.passwordResetTokenHash = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return true;
  }
}
