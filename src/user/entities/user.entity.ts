import { FoodEntity } from '@/src/comidas/entities/food.entity';
import { BaseEntity } from '../../config/base.entity';
import { Column, Entity, JoinColumn, OneToMany, Unique } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

@Entity({ name: 'users' })
@Unique(['email', 'username'])
export class UserEntity extends BaseEntity {
  @Column('varchar')
  email!: string;

  @Column('varchar')
  username!: string;

  @Column({ type: 'varchar', select: false })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER
  })
  role!: string;

  @OneToMany(() => FoodEntity, (food) => food.user)
  @JoinColumn({ name: 'food_id' })
  food!: FoodEntity[];
}
