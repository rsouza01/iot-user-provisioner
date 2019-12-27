export default function injectHandlerDependencies(handler, repository, engine, logger, ValidationError) {
  return (req, res) => {
    handler(req, res, repository, engine, logger, ValidationError);
  };
}
