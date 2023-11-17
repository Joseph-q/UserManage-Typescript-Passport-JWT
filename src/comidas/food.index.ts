import { FoodRouter } from '@/src/comidas/food.router';
import { Router } from 'express';
import type express from 'express';

export class FoodIndex {
  public router: express.Router = Router();

  constructor() {
    this.router.use('/food', new FoodRouter().router);
  }
}
