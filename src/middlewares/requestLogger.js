'use strict';
const logger = require('../logger');

module.exports = (req, res, next) => {
  logger.debug({
    message: JSON.stringify({
      method: req.method,
      route: req.originalUrl,
      query: JSON.stringify(req.query || {}),
      params: JSON.stringify(req.originalParams || {}),
      body: JSON.stringify(req.body || {})
    })
  });
  next();
};
