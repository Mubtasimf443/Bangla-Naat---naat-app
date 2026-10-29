// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto } from '../common/dto/pagination.dto';
import { Role } from '../common/enums/role.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateNaatDto, InitialNaatsQueryDto, QueryNaatsDto, UpdateNaatDto } from './dto/naat.dto';
import { NaatsService } from './naats.service';

/** Read endpoints used by the mobile app: /api/naats/... */
@ApiTags('Naats')
@Controller('naats')
export class NaatsController {
  constructor(private readonly naats: NaatsService) {}

  @Get('initial')
  @ApiOperation({ summary: 'Download every naat in the database (first app launch)' })
  async initial() {
    return await this.naats.findInitial();
  }

  @Get('popular')
  @ApiOperation({ summary: 'Most liked naats' })
  popular(@Query() query: PaginationDto) {
    return this.naats.findPopular(query);
  }


  @Get('fevorites')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Logged-in user's favorite (liked) naats" })
  favorites(@CurrentUser() user: UserDocument, @Query() query: PaginationDto) {
    return this.naats.findFavorites(user.id, query);
  }
}

/** Single-naat endpoints: /api/naat/... */
@ApiTags('Naat')
@Controller('naat')
export class NaatController {
  constructor(private readonly naats: NaatsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get one naat' })
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    return this.naats.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Create a naat (admin/moderator) - notifies all connected clients' })
  create(@Body() dto: CreateNaatDto) {
    return this.naats.create(dto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Update a naat (admin/moderator) - notifies all connected clients' })
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() dto: UpdateNaatDto) {
    return this.naats.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Delete a naat (admin/moderator)' })
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    return this.naats.remove(id);
  }

  @Patch(':id/like')
  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Like / unlike a naat (toggle). Liked naats become favorites' })
  like(@Param('id', ParseObjectIdPipe) id: string, @CurrentUser() user: UserDocument) {
    return this.naats.toggleLike(id, user.id);
  }
}
