import { type Response, type Request, type NextFunction } from 'express';
import { validate } from 'class-validator';
import { UserDTO } from '../dto/user.dto';
import { HttpResponse } from '@/src/shared/response/httpResponse';
import { SharedMiddleware } from '@/src/shared/middleware/shared.middleware';

export class UserMiddleware extends SharedMiddleware {
  constructor(private readonly response: HttpResponse = new HttpResponse()) {
    super();
  }

  async UserValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const { email, username, password, role } = req.body;
    const valid = new UserDTO();

    valid.username = username;
    valid.password = password;
    valid.email = email;
    valid.role = role;

    validate(valid, { validationError: { target: false } })
      .then((errors) => {
        if (errors.length > 0) {
          for (const error of errors) {
            const constraints = Object.values(
              error.constraints ?? 'There is not error'
            );
            const msg = constraints.join(', ');
            this.response.BadRequest(res, msg);
          }
        } else {
          next();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
