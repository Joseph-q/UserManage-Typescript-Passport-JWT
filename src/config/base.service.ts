import { ConfigServer } from './config';
import { type BaseEntity } from './base.entity';
import { type EntityTarget, type Repository } from 'typeorm';

export class BaseService<T extends BaseEntity> extends ConfigServer {
  exectRepository: Promise<Repository<T>>;
  constructor(getEntity: EntityTarget<T>) {
    super();
    this.exectRepository = this.InitRespository(getEntity);
  }

  async InitRespository(entity: EntityTarget<T>): Promise<Repository<T>> {
    const getConn = await this.InitConect;
    return getConn.getRepository(entity);
  }
}
