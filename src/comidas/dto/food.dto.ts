import { BaseDTO } from '@/src/config/base.dto';
import { UserEntity } from '@/src/user/entities/user.entity';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID
} from 'class-validator';

export class FoodDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  foodname!: string;

  @IsNotEmpty()
  @IsNumberString()
  protein!: number;

  @IsNotEmpty()
  @IsNumberString()
  carbohydrates!: number;

  @IsNotEmpty()
  @IsNumberString()
  calories!: number;

  @IsNotEmpty()
  @IsNumberString()
  fats!: number;

  @IsOptional()
  @IsUUID()
  user!: UserEntity;
}
