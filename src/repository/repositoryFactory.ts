import User from "../domain/user";
import { Repository } from "./repository";
import { UserMongoRepository } from './mongoRepo';
import { NullRepository } from "./nullRepo";

export enum RepositoryType {
    User
}

export class RepositoryFactory {
    static getRepository(repositoryType: RepositoryType): Repository {
        switch(repositoryType) {
            case RepositoryType.User: return new UserMongoRepository();
            //case RepositoryType.User: return new NullRepository();
        }
    }
}