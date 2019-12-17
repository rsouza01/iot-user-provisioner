import Debug from "debug";
import mongoose from 'mongoose';
import { UserRepository } from "./repository";
import User from '../domain/user';

const debug = Debug("iot-user-provisioner:mongo-repo");

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
            _id: {
                type: String,
                required: true
            },
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

        const credentials = `${process.env.USER_DB_SERVER_USERNAME}:${process.env.USER_DB_SERVER_PASSWORD}`;
        const uri = `${process.env.USER_DB_SERVER_PROTOCOL}://${credentials}@${process.env.USER_DB_SERVER_HOSTNAME}:${process.env.USER_DB_SERVER_PORT}/${process.env.USER_DB_SERVER_DATABASE}`;

        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.info(`Successfully connected to ${process.env.USER_DB_SERVER_PROTOCOL}://${process.env.USER_DB_SERVER_HOSTNAME}:${process.env.USER_DB_SERVER_PORT}/${process.env.USER_DB_SERVER_DATABASE}`);
            debug(`Successfully connected to ${process.env.USER_DB_SERVER_PROTOCOL}://${process.env.USER_DB_SERVER_HOSTNAME}:${process.env.USER_DB_SERVER_PORT}/${process.env.USER_DB_SERVER_DATABASE}`);
        })
          .catch(error => {
            console.error('Error connecting to database: ', error);
          });

        this.userRepository = mongoose.model<UserDocument>('user', this.schema);

    }

    async insert(user: User): Promise<any> {

        debug(`insert.a - Received object: ${JSON.stringify(user)}`);

        return this.userRepository.create(user)
            .then((data: UserDocument) => {
                debug(`insert.b - Saved object: ${JSON.stringify(data)}`);
                Promise.resolve(data);
                return;
            })
            .catch((error: Error) => {
                throw error;
            });
    }
}