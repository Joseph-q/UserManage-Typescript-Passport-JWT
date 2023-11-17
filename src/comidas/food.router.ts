import { BaseRouter } from '../shared/router/router';
import { FoodController } from './controllers/food.controller';
import { FoodMiddleware } from './middleware/food.middleware';

export class FoodRouter extends BaseRouter<FoodController, FoodMiddleware> {
  constructor() {
    super(FoodController, FoodMiddleware);
  }

  routes(): void {
    this.router.get(
      '/',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.getAll(req, res);
      }
    );

    this.router.get(
      '/:id',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.getById(req, res);
      }
    );

    this.router.get(
      '/name',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.getByName(req, res);
      }
    );

    this.router.post(
      '/',
      (req, res, next) => {
        void this.middleware.ValidateFood(req, res, next);
      },
      (req, res, next) => {
        void this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.createOne(req, res);
      }
    );

    this.router.patch(
      '/:id',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.updateOne(req, res);
      }
    );

    this.router.delete(
      '/:id',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.deleteOne(req, res);
      }
    );
  }
}
