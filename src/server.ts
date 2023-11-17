import express from 'express';
import 'reflect-metadata';
import morgan from 'morgan';
import cors from 'cors';
import { ConfigServer } from './config/config';
import { FoodIndex } from './comidas/food.index';
import { UserIndex } from './user/user.index';
import { AuthIndex } from './auth/auth.index';
import { LoginStrategy } from './auth/strategies/login.strategy';
import { JWTStr } from './auth/strategies/jwt.strategy';

class ServerBootrap extends ConfigServer {
  public app: express.Application = express();
  private readonly port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(
      cors({
        origin: 'http://localhost:3000', // El origen permitido
        methods: 'GET,PATCH,POST,DELETE', // Los métodos HTTP permitidos
        credentials: true, // Habilitar cookies o credenciales
        optionsSuccessStatus: 204 // Un código de respuesta para las solicitudes OPTIONS
      })
    );
    this.passportUse();

    this.app.use(morgan('dev'));

    this.app.use('/api', this.routers());

    this.listen();
  }

  passportUse(): any {
    return [new LoginStrategy().use, new JWTStr().use];
  }

  routers(): express.Router[] {
    return [
      new FoodIndex().router,
      new UserIndex().router,
      new AuthIndex().router
    ];
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log('listening on port ' + this.port);
    });
  }
}

// eslint-disable-next-line no-new
new ServerBootrap();
