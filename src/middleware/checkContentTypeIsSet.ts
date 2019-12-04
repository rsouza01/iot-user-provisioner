import * as HttpStatus from 'http-status-codes';

export default function checkContentTypeIsSet(req, res, next) {
    if (req.headers['content-length'] && req.headers['content-length'] !== '0' && !req.headers['content-type']) {
        res.status(HttpStatus.BAD_REQUEST);
        res.set('Content-Type', 'application/json');
        return res.json({
            message: 'The "Content-Type" header must be set for requests with a non-empty payload'
        });
    }
    return next();
}