export default function injectHandlerDependencies(handler, repository, engine, logger) {
  return (req, res) => {
    handler(req, res, repository, engine, logger);
  };
}
