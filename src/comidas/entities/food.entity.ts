import { UserEntity } from '@/src/user/entities/user.entity';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'Foods' })
export class FoodEntity extends BaseEntity {
  @Column('varchar')
  foodname!: string;

  @Column('decimal', { precision: 7, scale: 2 })
  protein!: number;

  @Column('decimal', { precision: 7, scale: 2 })
  carbohydrates!: number;

  @Column('decimal', { precision: 7, scale: 2 })
  calories!: number;

  @Column('decimal', { precision: 7, scale: 2 })
  fats!: number;

  @ManyToOne((type) => UserEntity, (user) => user.food)
  user!: UserEntity;
}
