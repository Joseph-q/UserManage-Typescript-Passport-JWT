/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import passport from 'passport';
import { HttpResponse } from '../response/httpResponse';
import { UserRole } from '@/src/user/entities/user.entity';
import { type Request, type Response, type NextFunction } from 'express';
import { type UserReq } from '@/src/auth/interfaces/userReq.interface';

export class SharedMiddleware {
  constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
  passAuth(req: Request, res: Response, next: NextFunction, type: string): any {
    return passport.authenticate(
      type,
      { session: false },
      (err, user, info) => {
        if (err || !user) {
          return this.httpResponse.Unauthorized(res, info);
        } else {
          req.user = user;
          next();
        }
      }
    );
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction): any {
    const user = req.user as UserReq;
    if (user.role !== UserRole.USER) {
      return this.httpResponse.Unauthorized(res, 'No tienes permiso');
    } else {
      next();
    }
  }

  checkAdminRole(req: Request, res: Response, next: NextFunction): any {
    const user = req.user as UserReq;
    if (user.role !== UserRole.USER) {
      return this.httpResponse.Unauthorized(res, 'No tienes permiso');
    } else {
      next();
    }
  }
}
