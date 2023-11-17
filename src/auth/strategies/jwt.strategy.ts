/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  ExtractJwt,
  Strategy as JWTStrategy,
  type VerifiedCallback,
  type StrategyOptions,
  type VerifyCallback
} from 'passport-jwt';
import { type UserPayload } from '../interfaces/payload.interface';
import { PassportUse } from '../utils/passport';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class JWTStr {
  async validate(payload: UserPayload, done: VerifiedCallback): Promise<any> {
    done(null, payload);
  }

  get use(): any {
    const key = authService.getEnvironment('SECRET_KEY');
    return PassportUse<JWTStrategy, StrategyOptions, VerifyCallback>(
      'jwtStr',
      JWTStrategy,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: key,
        ignoreExpiration: false
      },
      this.validate
    );
  }
}
