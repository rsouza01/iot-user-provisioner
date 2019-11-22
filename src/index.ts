import  express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';

import * as handlers from './handlers'

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

handlers.registerRoutes(app);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
