// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsIn, IsISO8601, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class CreateNaatDto {
  @ApiProperty({ example: 'Tala al Badru Alayna' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({ description: 'Full naat text (Bangla/Arabic/any)' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 'Hamd & Naat' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  category: string;

  @ApiProperty({ example: 'Kazi Nazrul Islam' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  author: string;

  @ApiPropertyOptional({ example: 'https://www.youtube.com/watch?v=xxxx' })
  @IsOptional()
  @IsUrl()
  youtubeUrl?: string;
}

export class UpdateNaatDto extends PartialType(CreateNaatDto) {}

export class QueryNaatsDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Search keyword' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: ['title', 'content', 'all'],
    default: 'all',
    description: 'Search in the title, in the naat text, or both',
  })
  @IsOptional()
  @IsIn(['title', 'content', 'all'])
  searchBy?: 'title' | 'content' | 'all';

  @ApiPropertyOptional({ description: 'Filter by category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ enum: ['new', 'popular'], default: 'new' })
  @IsOptional()
  @IsIn(['new', 'popular'])
  sort?: 'new' | 'popular';
}

export class InitialNaatsQueryDto {
  @ApiPropertyOptional({
    example: '2026-01-01T00:00:00.000Z',
    description: 'Optional delta sync: only naats created/updated after this time',
  })
  @IsOptional()
  @IsISO8601()
  updatedAfter?: string;
}
