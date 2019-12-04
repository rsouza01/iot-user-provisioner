import * as HttpStatus from 'http-status-codes';

export default function checkEmptyPayload(req, res, next) {
    if (['POST', 'PATCH', 'PUT'].includes(req.method) && req.headers['content-length'] === '0') {
        res.status(HttpStatus.BAD_REQUEST);
        res.set('Content-Type', 'application/json');
        return res.json({
            message: 'Payload should not be empty',
        });
    }
    return next();
}
