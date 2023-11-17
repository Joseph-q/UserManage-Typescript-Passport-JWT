import type express from 'express';
import { Router } from 'express';
import { AuthRouter } from './routes/auth.route';

export class AuthIndex {
  public router: express.Router = Router();

  constructor() {
    this.router.use('/auth', new AuthRouter().router);
  }
}
