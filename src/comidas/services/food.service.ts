import { type DeleteResult, type UpdateResult } from 'typeorm';
import { BaseService } from '@/src/config/base.service';
import { FoodEntity } from '../entities/food.entity';
import { type FoodDTO } from '../dto/food.dto';

export class FoodService extends BaseService<FoodEntity> {
  constructor() {
    super(FoodEntity);
  }

  async FindAllFoods(): Promise<FoodEntity[]> {
    return await (
      await this.exectRepository
    ).find({ relations: { user: true } });
  }

  async FindFoodById(id: string): Promise<FoodEntity | null> {
    return await (await this.exectRepository)
      .createQueryBuilder('food')
      .leftJoinAndSelect('food.user', 'user')
      .where('food.id = :id', { id })
      .getOne();
  }

  async FindFoodByName(foodname: string): Promise<FoodEntity | null> {
    return await (await this.exectRepository).findOneBy({ foodname });
  }

  async createFood(body: any): Promise<any> {
    const food = (await this.exectRepository).create(body);

    return await (await this.exectRepository).save(food);
  }

  async updateFood(id: string, body: FoodDTO): Promise<UpdateResult> {
    return await (await this.exectRepository)
      .createQueryBuilder('food')
      .update(FoodEntity)
      .set(body)
      .where('id = :id', { id })
      .execute();
  }

  async deleteFood(id: string): Promise<DeleteResult> {
    return await (await this.exectRepository).delete(id);
  }
}
