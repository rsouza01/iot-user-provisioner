import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import checkContentTypeIsJson from './checkContentTypeIsJson'
import checkContentTypeIsSet from './checkContentTypeIsSet'
import checkEmptyPayload from './checkEmptyPayload'

export function registerMiddleware(app: Application) {
    app.use(cors());

    app.use(checkEmptyPayload);
    app.use(checkContentTypeIsSet);
    app.use(checkContentTypeIsJson)

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    
}