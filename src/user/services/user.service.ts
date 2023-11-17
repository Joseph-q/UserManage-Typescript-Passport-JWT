import { BaseService } from '@/src/config/base.service';
import { UserEntity } from '../entities/user.entity';
import { type UpdateResult, type DeleteResult } from 'typeorm';
import { type UserDTO } from '../dto/user.dto';
import bcrypt from 'bcryptjs';

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async FindUserById(id: string): Promise<UserEntity | null> {
    return await (await this.exectRepository)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async FindUserWithRelation(id: string): Promise<UserEntity | null> {
    return await (await this.exectRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.food', 'food')
      .where('user.id = :id', { id })
      .getOne();
  }

  async FindUserByEmail(email: string): Promise<UserEntity | null> {
    return await (await this.exectRepository)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async FindUserByName(username: string): Promise<UserEntity | null> {
    return await (await this.exectRepository)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect('user.password')
      .getOne();
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return await (await this.exectRepository).find();
  }

  async createUser(body: UserDTO): Promise<UserEntity | null> {
    const user = (await this.exectRepository).create(body);
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;

    return await (await this.exectRepository).save(user);
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await (await this.exectRepository).delete(id);
  }

  async updateUser(id: string, body: UserDTO): Promise<UpdateResult> {
    const user = (await this.exectRepository).create(body);

    if (body.password != null) {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    }

    return await (await this.exectRepository)
      .createQueryBuilder('user')
      .update(UserEntity)
      .set(user)
      .where('id = :id', { id })
      .execute();
  }
}
