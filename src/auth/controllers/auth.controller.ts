import { type Request, type Response } from 'express';
import { HttpResponse } from '../../shared/response/httpResponse';
import { AuthService } from '../services/auth.service';
import { type UserEntity } from '@/src/user/entities/user.entity';

export class AuthController extends AuthService {
  constructor(private readonly response = new HttpResponse()) {
    super();
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const userEncode = req.user as UserEntity;
      const token = await this.newToken(userEncode);

      res.header('Content-Type', 'application/json');
      res.cookie('accessToken', token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.write(JSON.stringify(token));
      res.end();
    } catch (err) {
      this.response.InternalServerErr(res, err);
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const token = await this.DeleteToken();
      res.header('Content-Type', 'application/json');
      res.cookie('accessToken', token, { maxAge: 0 });
      res.write(JSON.stringify(token));
      res.end();
    } catch (err) {
      this.response.InternalServerErr(res, err);
    }
  }
}
