import User from "../domain/user";

export interface Repository {

}

export interface UserRepository extends Repository {
    insert(user: User): Promise<any>;
}