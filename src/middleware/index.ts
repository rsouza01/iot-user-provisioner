import { Application } from 'express';

import checkContentTypeIsJson from './checkContentTypeIsJson'
import checkContentTypeIsSet from './checkContentTypeIsSet'
import checkEmptyPayload from './checkEmptyPayload'

export function registerMiddleware(app: Application) {
    app.use(checkEmptyPayload);
    app.use(checkContentTypeIsSet);
    app.use(checkContentTypeIsJson)
}