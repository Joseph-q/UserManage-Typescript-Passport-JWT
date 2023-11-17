/* eslint-disable @typescript-eslint/no-unused-expressions */
import { BaseRouter } from '@/src/shared/router/router';
import { UserController } from '@/src/user/controller/user.controller';
import { UserMiddleware } from '@/src/user/middleware/user.middleware';

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  routes(): void {
    this.router.get(
      '/all',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        this.middleware.checkAdminRole(req, res, next);
      },
      (req, res) => {
        void this.controller.getUsers(req, res);
      }
    );

    this.router.get(
      '/',
      (req, res, next) => {
        void this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        void this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.getUserById(req, res);
      }
    );

    this.router.get(
      '/food',
      (req, res, next) => {
        void this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res) => {
        void this.controller.getUserWithRelation(req, res);
      }
    );

    this.router.post(
      '/',
      (req, res, next) => {
        void this.middleware.UserValidation(req, res, next);
      },
      (req, res) => {
        void this.controller.createUser(req, res);
      }
    );

    this.router.patch(
      '/',
      (req, res, next) => {
        void this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        void this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.updateUser(req, res);
      }
    );

    this.router.delete(
      '/',
      (req, res, next) => {
        void this.middleware.passAuth(req, res, next, 'jwtStr')(req, res, next);
      },
      (req, res, next) => {
        void this.middleware.checkCustomerRole(req, res, next);
      },
      (req, res) => {
        void this.controller.deleteUser(req, res);
      }
    );
  }
}
