export default function injectHandlerDependencies(handler, repository, engine, logger, validator, ValidationError) {
  return (req, res) => {
    handler(req, res, repository, engine, logger, validator, ValidationError);
  };
}
