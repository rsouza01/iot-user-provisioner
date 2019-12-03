import User from "../domain/user";

export interface UserRepository {
    insert(user: User): void;
}