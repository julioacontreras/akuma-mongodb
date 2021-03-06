import {Mongoose} from 'mongoose';
import {MicroServiceError} from 'akuma-microservice-framework/lib/adapters/action-protocol/exception/microServiceError';
import {RepositoryAdapter} from 'akuma-microservice-framework/lib/adapters/db/repository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let MongoModel: any | null = null;

export class MongoRepository implements RepositoryAdapter {
  transformer: unknown;
  db: any;
  constructor(repository: string, schema: any, db: Mongoose){
    this.setDB(db);
    this.createRepository(repository, schema);
  }
  setDB(db: unknown): void {
    this.db = db;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async createRepository(repository: string, schema: any) {
    MongoModel = this.db.model(repository, new this.db.Schema(schema));
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return MongoModel;
  }
  async createOne(data: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!MongoModel) {
        reject('Not exist repository');
      }
      const doc = new MongoModel(data);
      resolve(doc.save());
    });
  }
  async updateOne(id: string, data: unknown): Promise<unknown> {
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return await MongoModel.updateOne({_id: id}, data);
  }
  async deleteOneById(id: string): Promise<unknown> {
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return await MongoModel.deleteOne({_id: id});
  }
  async findOneById(id: string): Promise<unknown> {
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return await MongoModel.findOne({_id: id});
  }
  async findOne(data: unknown): Promise<unknown> {
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return await MongoModel.findOne(data);
  }
  async find(selector: unknown): Promise<unknown> {
    if (!MongoModel) {
      throw new MicroServiceError('Not exist repository', 'mongodb');
    }
    return await MongoModel.find(selector);
  }
}
