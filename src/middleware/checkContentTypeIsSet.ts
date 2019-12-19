import * as HttpStatus from 'http-status-codes';
import Debug from 'debug';

const debug = Debug('iot-user-provisioner:checkContentTypeIsSet');

export default function checkContentTypeIsSet(req, res, next) {
  if (req.headers['content-length'] && req.headers['content-length'] !== '0' && !req.headers['content-type']) {
    debug('Content-Type not Set');

    res.status(HttpStatus.BAD_REQUEST);
    res.set('Content-Type', 'application/json');
    return res.json({
      message: 'The "Content-Type" header must be set for requests with a non-empty payload',
    });
  }
  return next();
}
