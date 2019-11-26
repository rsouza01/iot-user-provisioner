import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as handlers from './handlers'

const app = express();

const PORT = process.env.SERVER_PORT || 3000;


function checkEmptyPayload(req, res, next) {
  if (['POST', 'PATCH', 'PUT'].includes(req.method) && req.headers['content-length'] === '0') {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'Payload should not be empty',
    });
  }
  next();
}
function checkContentTypeIsSet(req, res, next) {
  if (req.headers['content-length'] && req.headers['content-length'] !== '0' && !req.headers['content-type']) {
    res.status(400);
    res.set('Content-Type', 'application/json');
    res.json({ message: 'The "Content-Type" header must be set for requests with a non-empty payload' });
  }
  next();
}
function checkContentTypeIsJson(req, res, next) {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(415);
    res.set('Content-Type', 'application/json');
    res.json({
      message: 'The "Content-Type" header must always be "application/json"'
    });
  }
  next();
}

function errorHandler(err, req, res, next) {
  //if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
  if (err instanceof SyntaxError) {
    res.status(415);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'Payload should be in JSON format' });
  }
  return next();
}

app.use(checkEmptyPayload);
app.use(checkContentTypeIsSet);
app.use(checkContentTypeIsJson)
app.use(errorHandler);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


handlers.registerRoutes(app);


if (require.main === module) {

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
