import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import * as handlers from './handlers'
import * as middleware from './middleware'
import { errorHandler } from './middleware/errorHandler'

const app = express();

const PORT = process.env.SERVER_PORT || 3000;


app.use(cors());

middleware.registerMiddleware(app);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

handlers.registerRoutes(app);

app.use(errorHandler);

if (require.main === module) {

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
