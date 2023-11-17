import { FoodRouter } from '@/src/comidas/food.router';
import { Router } from 'express';
import type express from 'express';

export class BaseIndex {
  public router: express.Router = Router();

  constructor() {
    this.router.use('/a', this.routers());
  }

  routers(): express.Router[] {
    return [new FoodRouter().router];
  }
}
