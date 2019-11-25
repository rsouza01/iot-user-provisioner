import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as handlers from './handlers'

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


handlers.registerRoutes(app);

function errorHandler(err, req, res, next) {
  //if (err instanceof SyntaxError && err.status === 400 && 'body' in err && err.type === 'entity.parse.failed') {
  if (err instanceof SyntaxError) {
      res.status(400);
    res.set('Content-Type', 'application/json');
    return res.json({ message: 'Payload should be in JSON format' });
  }
  return next();
}

app.use(errorHandler);

if (require.main === module) {

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
