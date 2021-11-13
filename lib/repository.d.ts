import { Mongoose } from 'mongoose';
import { RepositoryAdapter } from 'akuma-microservice-framework/lib/adapters/db/repository';
export declare class MongoRepository implements RepositoryAdapter {
    transformer: unknown;
    db: any;
    constructor(repository: string, schema: any, db: Mongoose);
    setDB(db: unknown): void;
    createRepository(repository: string, schema: any): Promise<any>;
    createOne(data: unknown): Promise<unknown>;
    updateOne(id: string, data: unknown): Promise<unknown>;
    deleteOneById(id: string): Promise<unknown>;
    findOneById(id: string): Promise<unknown>;
    findOne(data: unknown): Promise<unknown>;
    find(selector: unknown): Promise<unknown>;
}
