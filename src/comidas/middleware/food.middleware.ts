import { type Request, type Response, type NextFunction } from 'express';
import { validate } from 'class-validator';
import { FoodDTO } from '../dto/food.dto';
import { HttpResponse } from '@/src/shared/response/httpResponse';
import { SharedMiddleware } from '@/src/shared/middleware/shared.middleware';
export class FoodMiddleware extends SharedMiddleware {
  constructor(private readonly response: HttpResponse = new HttpResponse()) {
    super();
  }

  async ValidateFood(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { foodname, protein, carbohydrates, calories, fats } = req.body;
    const valid = new FoodDTO();

    valid.foodname = foodname;
    valid.calories = calories;
    valid.carbohydrates = carbohydrates;
    valid.fats = fats;
    valid.protein = protein;

    validate(valid)
      .then((err) => {
        if (err.length > 0) {
          this.response.BadRequest(res, err);
        } else {
          next();
        }
      })
      .catch(() => {});
  }
}
