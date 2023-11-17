import { BaseRouter } from '@/src/shared/router/router';
import { AuthController } from '../controllers/auth.controller';
import { SharedMiddleware } from '@/src/shared/middleware/shared.middleware';

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post(
      '/login',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'login')(req, res, next);
      },
      (req, res) => {
        void this.controller.login(req, res);
      }
    );
    this.router.post(
      '/logout',
      (req, res, next) => {
        this.middleware.passAuth(req, res, next, 'jwtStr');
      },
      (req, res) => {
        void this.controller.logout(req, res);
      }
    );
  }
}
