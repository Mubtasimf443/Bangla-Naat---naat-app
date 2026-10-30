// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import {
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import {  JwtBearerAuthGuard } from '../common/guards/jwt-bearer-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { QueryUsersDto } from './dto/query-users.dto';
import { UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users (Admin)')
@ApiBearerAuth()
@UseGuards(JwtBearerAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List users with pagination and search (admin only)' })
  findAll(@Query() query: QueryUsersDto) {
    return this.users.findPaginated(query);
  }

  @Patch(':id/bann')
  @ApiOperation({ summary: 'Ban a user (admin only)' })
  async ban(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() admin: UserDocument) {
    await this.assertManageable(id, admin);
    const user = await this.users.setBanned(id, true);
    return { message: 'User banned', user };
  }

  @Patch(':id/unbenn')
  @ApiOperation({ summary: 'Unban a user (admin only)' })
  async unban(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() admin: UserDocument) {
    await this.assertManageable(id, admin);
    const user = await this.users.setBanned(id, false);
    return { message: 'User unbanned', user };
  }

  @Patch(':id/delete')
  @ApiOperation({ summary: "Delete a user's account (admin only)" })
  async remove(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() admin: UserDocument) {
    await this.assertManageable(id, admin);
    await this.users.remove(id);
    return { message: 'User account deleted' };
  }

  /** Admins can not ban/delete themselves or other admins. */
  private async assertManageable(id: string, admin: UserDocument) {
    const target = await this.users.findById(id);
    if (!target) throw new NotFoundException('User not found');
    if (target.id === admin.id) throw new ForbiddenException('You can not do this to yourself');
    if (target.role === Role.ADMIN) throw new ForbiddenException('You can not manage another admin');
  }
}
