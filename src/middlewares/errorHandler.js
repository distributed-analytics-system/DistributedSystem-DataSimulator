const logger = require('../logger');
const { omit } = require('lodash');
const { CustomError, InternalServerError, BadRequest } = require('../errors');

function convertToAppError (err, req) {
  const { metadata: { reqId } } = req;

  let appError = err;
  // Passing Bad Request errors
  if (err.status === 400) {
    appError = new BadRequest({message: err.message, id: reqId});
  } else if (!(err instanceof CustomError)) {
    if (err && err.error && err.error.isJoi) {
      appError = new BadRequest({
        message: `Error validating request ${err.type}: ${err.error.details[0].message}`,
        id: reqId
      });
    } else {
      appError = new InternalServerError({
        id: reqId,
        message: err.message || err.error,
        details: omit(err, ['message', 'stack']),
        stack: err.stack
      });
    }
  }

  // Adding request params in the error
  appError.reqParams = {
    method: req.method,
    route: req.route ? req.route.path : '',
    query: JSON.stringify(req.query || {}),
    params: JSON.stringify(req.originalParams || {}),
    body: JSON.stringify(req.body || {})
  };
  return appError;
}

module.exports = async (err, req, res, next /* do not remove unused 'next' param */) => {
  const { metadata: { reqId } } = req;

  /** Construct app error */
  const appError = convertToAppError(err, req);

  const { statusCode, timestamp, id: uuid } = appError;

  /** Log the error */
  const isInternalServerError = appError instanceof InternalServerError;
  // Logging as an error in case of InternalServerErrors and warn for other cases
  logger[isInternalServerError ? 'error' : 'warn']({ message: appError, id: reqId });

  /** Construct and send error response */
  const responseMessage = !isInternalServerError ? appError.message : 'Internal server error';
  res.status(statusCode).json({ message: responseMessage, uuid, timestamp });
};
