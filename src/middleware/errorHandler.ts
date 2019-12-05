import * as HttpStatus from 'http-status-codes';

export function errorHandler(err, req, res, next) {

    //if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
    if (err instanceof SyntaxError) {

        console.log(`>>>>>>>> errorHandler (4)`);

        res.status(HttpStatus.BAD_REQUEST);
        res.set('Content-Type', 'application/json');
        return res.json({ message: 'Payload should be in JSON format' });
    }
    return next();
}

