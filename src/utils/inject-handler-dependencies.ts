export default function injectHandlerDependencies(handler, db, engine, logger) {
  return (req, res) => {
    handler(req, res, db, engine, logger);
  };
}
