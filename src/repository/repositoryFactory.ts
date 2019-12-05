import User from "../domain/user";
import { Repository } from "./repository";
import { UserMongoRepository } from './mongoRepo';

export enum RepositoryType {
    User
}

export class RepositoryFactory {
    static getRepository(repositoryType: RepositoryType): Repository {
        switch(repositoryType) {
            case RepositoryType.User: return new UserMongoRepository();
        }
    }
}