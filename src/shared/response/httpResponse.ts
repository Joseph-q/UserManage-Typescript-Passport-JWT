import { type Response } from 'express';
export class HttpResponse {
  Ok(res: Response, data: any, msg = 'Success', status = 200): Response {
    return res.status(status).json({ status, msg, data });
  }

  Unauthorized(
    res: Response,
    data: any,
    msg = 'Unauthorized',
    status = 401
  ): Response {
    return res.status(status).json({ status, msg, data });
  }

  BadRequest(
    res: Response,
    data: any,
    msg = 'Bad request',
    status = 400
  ): Response {
    return res.status(status).json({ status, msg, data });
  }

  InternalServerErr(
    res: Response,
    data?: any,
    status = 500,
    msg = 'Error 500'
  ): Response {
    return res.status(status).json({ status, msg });
  }

  NoContentOk(res: Response, status = 204): Response {
    return res.status(status);
  }
}
