import * as HttpStatus from 'http-status-codes';
import Debug from 'debug';

const debug = Debug('iot-user-provisioner:checkContentTypeIsJson');

export default function checkContentTypeIsJson(req, res, next) {
  if (!req.headers['content-type'].includes('application/json')) {
    debug('Invalid req.headers[\'content-type\']');

    res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    res.set('Content-Type', 'application/json');
    return res.json({
      message: 'The "Content-Type" header must always be "application/json"',
    });
  }
  return next();
}
