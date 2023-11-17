import { UserRouter } from '@/src/user/router/user.router';
import { Router } from 'express';
import type express from 'express';

export class UserIndex {
  public router: express.Router = Router();

  constructor() {
    this.router.use('/user', new UserRouter().router);
  }
}
