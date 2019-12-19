export default function injectHandlerDependencies(handler, db, logger) {
  return (req, res) => {
    handler(req, res, db, logger);
  };
}
