import mongoose from 'mongoose';
import { UserRepository } from "./repository";
import User from '../domain/user';


export interface UserDocument extends mongoose.Document {
    email: string;
    password: string;
}

export class UserMongoRepository implements UserRepository {

    private schema: mongoose.Schema;
    private userModel: any;
    private userRepository: any;

    constructor() {

        this.schema = new mongoose.Schema({
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
        });

        this.userModel = mongoose.model('User', this.schema);

        const uri = 'mongodb://UserAdmin:abc123@localhost:27017/users';

        mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
            console.info(`>>>>>>>>> Successfully connected to ${uri}`);
          })
          .catch(error => {
            console.error('>>>>>>>>> Error connecting to database: ', error);
          });

        this.userRepository = mongoose.model<UserDocument>('user', this.schema);

    }

    async insert(user: User): Promise<any> {

        return this.userRepository.create(user)
            .then((data: UserDocument) => {
                return data;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}