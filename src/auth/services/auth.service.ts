import * as JWT from 'jsonwebtoken';
import {
  type UserRole,
  type UserEntity
} from '@/src/user/entities/user.entity';
import { UserService } from '@/src/user/services/user.service';
import { type UserPayload } from '../interfaces/payload.interface';
import { ConfigServer } from '@/src/config/config';

export class AuthService extends ConfigServer {
  constructor(private readonly userService: UserService = new UserService()) {
    super();
  }

  async FindByEmailOrUsername(username: string): Promise<UserEntity | null> {
    const IsEmail = await this.userService.FindUserByEmail(username);
    const IsUsername = await this.userService.FindUserByName(username);
    if (IsEmail != null) {
      return IsEmail;
    }

    if (IsUsername != null) {
      return IsUsername;
    }
    return null;
  }

  async SingToken(
    payload: UserPayload,
    secret: any,
    expires = 0
  ): Promise<string> {
    return JWT.sign(payload, secret, { expiresIn: expires });
  }

  async newToken(user: UserEntity): Promise<string> {
    const userWithRole = await this.FindByEmailOrUsername(user.username);

    if (userWithRole != null) {
      userWithRole.password = 'No autorized';
    }

    const payload: UserPayload = {
      username: userWithRole!.username,
      role: userWithRole!.role as UserRole,
      id: userWithRole!.id
    };

    const token = await this.SingToken(
      payload,
      this.getEnvironment('SECRET_KEY'),
      7 * 24 * 60 * 60 * 1000
    );

    return token;
  }

  async DeleteToken(): Promise<string> {
    const payload: UserPayload = {
      username: '0',
      role: null,
      id: '0'
    };

    const token = await this.SingToken(payload, '0', 0);

    return token;
  }
}
