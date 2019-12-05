import * as HttpStatus from 'http-status-codes';
import Debug from "debug";

const debug = Debug("iot-user-provisioner:errorHandler");

export function errorHandler(err, req, res, next) {

    //if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
    if (err instanceof SyntaxError) {

        debug(`errorHandler`, err.message);

        res.status(HttpStatus.BAD_REQUEST);
        res.set('Content-Type', 'application/json');
        return res.json({ message: 'Payload should be in JSON format' });
    }
    return next();
}

