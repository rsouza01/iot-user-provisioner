import express from 'express';

import * as handlers from './handlers'
import * as middleware from './middleware'
import { errorHandler } from './middleware/errorHandler'
import { RepositoryFactory, RepositoryType } from './repository/repositoryFactory';
import { UserRepository } from './repository/repository';

const app = express();

const PORT = process.env.SERVER_PORT || 3000;

const userRepository = RepositoryFactory.getRepository(RepositoryType.User) as UserRepository;

middleware.registerMiddleware(app);
handlers.registerRoutes(app, userRepository);

app.use(errorHandler);

if (require.main === module) {

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
  });
}

export default app;
