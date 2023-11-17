import { BaseDTO } from '@/src/config/base.dto';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength
} from 'class-validator';

export class UserDTO extends BaseDTO {
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email!: string;

  @IsNotEmpty({ message: 'Username should not be empty' })
  username!: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(8, { message: 'Password mus be at least 8 characters' })
  password!: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Role is not valid' })
  role!: string;
}
