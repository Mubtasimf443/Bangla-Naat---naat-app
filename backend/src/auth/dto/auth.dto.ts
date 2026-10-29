// بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ صلى الله عليه وسلم InshaAllah
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Abdullah' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @ApiProperty({ example: 'abdullah@example.com' })
  @IsEmail()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'StrongPass123', minLength: 8 })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'abdullah@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'StrongPass123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @MinLength(8)
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'abdullah@example.com' })
  @IsEmail()
  @MinLength(6)
  @MaxLength(255)
  email: string;

  @ApiProperty({
    example: 'MyNewPass456',
    minLength: 8,
    maxLength : 64,
    description: 'Applied only after the user clicks the link sent to their email',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  newPassword: string;
}
