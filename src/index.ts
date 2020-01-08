import express from 'express';
import Debug from 'debug';

import * as defaultLogger from '@iot-stuff/iot-logger';
import * as handlers from './handlers';
import * as middleware from './middleware';
import { errorHandler } from './middleware/errorHandler';

const debug = Debug(process.env.APP_NAME || 'iot-user-provisioner');

debug('Starting server....');

const app = express();

const PORT = process.env.SERVER_PORT || 3000;


const iotLogger = defaultLogger.getIoTDefaultLogger(
  process.env.APP_NAME,
  process.env.APP_VERSION,
  process.env.APP_LOG_FILE,
);

middleware.registerMiddleware(app);
handlers.registerRoutes(app, iotLogger);

app.use(errorHandler);


// app.shutdown = function () {
//   // clean up your resources and exit
//   process.exit();
// };
// process.on('SIGINT', function onSigint() {
//   app.shutdown();
// });
// process.on('SIGTERM', function onSigterm() {
//   app.shutdown();
// });


if (require.main === module) {
  app.listen(PORT, () => {
    debug(`Server successfully started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
