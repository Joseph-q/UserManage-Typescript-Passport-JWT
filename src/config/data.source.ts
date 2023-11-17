import { DataSource } from 'typeorm';
import { type MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import * as dotenv from 'dotenv';

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : '.env'
});

const Config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // eslint-disable-next-line n/no-path-concat
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: false
};

export const AppDataSource: DataSource = new DataSource(Config);
