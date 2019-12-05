import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import checkContentTypeIsJson from './checkContentTypeIsJson'
import checkContentTypeIsSet from './checkContentTypeIsSet'
import checkEmptyPayload from './checkEmptyPayload'

import Debug from "debug";
const debug = Debug("iot-user-provisioner:middleware");


export function registerMiddleware(app: Application) {

    debug('Registering middlewares...');

    debug('Registering CORS...');
    app.use(cors());

    debug('Registering checkEmptyPayload...');
    app.use(checkEmptyPayload);
    debug('Registering checkContentTypeIsSet...');
    app.use(checkContentTypeIsSet);
    debug('Registering checkContentTypeIsJson...');
    app.use(checkContentTypeIsJson)

    debug('Registering bodyParser...');
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
}