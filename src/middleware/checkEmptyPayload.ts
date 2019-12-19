import * as HttpStatus from 'http-status-codes';
import Debug from 'debug';

const debug = Debug('iot-user-provisioner:checkEmptyPayload');

export default function checkEmptyPayload(req, res, next) {
  if (['POST', 'PATCH', 'PUT'].includes(req.method) && req.headers['content-length'] === '0') {
    debug('Empty Payload');

    res.status(HttpStatus.BAD_REQUEST);
    res.set('Content-Type', 'application/json');
    return res.json({
      message: 'Payload should not be empty',
    });
  }
  return next();
}
