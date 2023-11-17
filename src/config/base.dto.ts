import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class BaseDTO {
  @IsOptional()
  @IsUUID()
  id!: string;

  @IsOptional()
  @IsDateString()
  created_at!: Date;

  @IsOptional()
  @IsDateString()
  updated_at!: Date;
}
