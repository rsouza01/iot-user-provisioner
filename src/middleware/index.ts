import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import checkContentTypeIsJson from './checkContentTypeIsJson'
import checkContentTypeIsSet from './checkContentTypeIsSet'
import checkEmptyPayload from './checkEmptyPayload'

export function registerMiddleware(app: Application) {

    console.log('Registering middlewares...');

    console.log('Registering CORS...');
    app.use(cors());

    console.log('Registering checkEmptyPayload...');
    app.use(checkEmptyPayload);
    console.log('Registering checkContentTypeIsSet...');
    app.use(checkContentTypeIsSet);
    console.log('Registering checkContentTypeIsJson...');
    app.use(checkContentTypeIsJson)

    console.log('Registering bodyParser...');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
}