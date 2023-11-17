import { HttpResponse } from '@/src/shared/response/httpResponse';
import { type Request, type Response } from 'express';
import { FoodService } from '../services/food.service';
import { type UserReq } from '@/src/auth/interfaces/userReq.interface';

export class FoodController {
  constructor(
    private readonly foodService: FoodService = new FoodService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.foodService.FindAllFoods();
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      console.log(id);
      const data = await this.foodService.FindFoodById(id);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }

  async getByName(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      const data = await this.foodService.FindFoodByName(name);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }

  async createOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user as UserReq;
      req.body.user = id;
      const data = await this.foodService.createFood(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }

  async deleteOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = await this.foodService.deleteFood(id);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }

  async updateOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const data = await this.foodService.updateFood(id, req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      return this.httpResponse.InternalServerErr(res, e);
    }
  }
}
