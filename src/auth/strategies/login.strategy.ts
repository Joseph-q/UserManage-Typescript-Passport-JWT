/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  Strategy as LocalStrategy,
  type VerifyFunction,
  type IStrategyOptions
} from 'passport-local';
import bcrypt from 'bcryptjs';
import { PassportUse } from '../utils/passport';
import { AuthService } from '../services/auth.service';

const authService = new AuthService();

export class LoginStrategy {
  async validate(username: string, password: string, done: any): Promise<void> {
    const user = await authService.FindByEmailOrUsername(username);
    if (user == null) {
      return done(null, false, { msg: 'Email or Password incorrect' });
    }

    const IsMatch = await bcrypt.compare(password, user.password);
    if (!IsMatch) {
      return done(null, false, { msg: 'Email or Password incorrect' });
    }
    return done(null, user);
  }

  get use(): void {
    return PassportUse<LocalStrategy, IStrategyOptions, VerifyFunction>(
      'login',
      LocalStrategy,
      { usernameField: 'username', passwordField: 'password' },
      this.validate
    );
  }
}
