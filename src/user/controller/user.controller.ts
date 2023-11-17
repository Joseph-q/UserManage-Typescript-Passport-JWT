import { type Request, type Response } from 'express';
import { HttpResponse } from '@/src/shared/response/httpResponse';
import { UserService } from '../services/user.service';
import { type UserPayload } from '@/src/auth/interfaces/payload.interface';

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly response: HttpResponse = new HttpResponse()
  ) {}

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.userService.findAllUsers();
      return this.response.Ok(res, data);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user as UserPayload;
      const data = await this.userService.FindUserById(id);
      if (data === null) {
        return this.response.BadRequest(res, 'User does not exists');
      }
      return this.response.Ok(res, data);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }

  async getUserWithRelation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user as UserPayload;
      const data = await this.userService.FindUserWithRelation(id);
      if (data === null) {
        return this.response.BadRequest(res, 'User does not exists');
      }
      return this.response.Ok(res, data);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { email, username } = req.body;
      const usernameExist = await this.userService.FindUserByName(username);
      const emailExist = await this.userService.FindUserByEmail(email);

      if (emailExist != null) {
        return this.response.BadRequest(res, 'Email Already exists');
      }

      if (usernameExist != null) {
        return this.response.BadRequest(res, 'Username Already exists');
      }

      return this.response.NoContentOk(res, 201);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user as UserPayload;
      const { email, username } = req.body;
      const usernameExist = await this.userService.FindUserByName(username);
      const emailExist = await this.userService.FindUserByEmail(email);

      if (emailExist != null) {
        return this.response.Ok(res, null, 'Email Already exists');
      }

      if (usernameExist != null) {
        return this.response.Ok(res, null, 'Username Already exists');
      }
      await this.userService.updateUser(id, req.body);

      return this.response.NoContentOk(res, 201);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user as UserPayload;
      await this.userService.deleteUser(id);
      return this.response.NoContentOk(res);
    } catch (e) {
      return this.response.InternalServerErr(res);
    }
  }
}
