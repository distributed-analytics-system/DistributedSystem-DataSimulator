'use strict';

require('./src/tracer');

const path = require('path');
const { environments } = require('./src/constants');

if (!process.env.NODE_ENV || process.env.NODE_ENV === environments.dev) {
  require('dotenv').config({ path: path.resolve(process.cwd(), '.env-dev') });
}

const app = require('express')();
const config = require('./src/config');
const logger = require('./src/logger');
const attachMiddlewares = require('./src/middlewares');

logger.info({ message: `Running in '${config.nodeEnv}' environment`});

// Attach express middlewares
attachMiddlewares(app);

// Binding port
app.listen(config.port, logger.info({ message: `Listening on port: ${config.port}` }));

// Checking Uncaught Exceptions and Unhandled Rejections
const uncaughtErrorHandler = (errType, err) => {
  logger.error({
    message: `${errType}: Error: ${err.message}, Stack: ${err.stack}`,
    metricsStat: `${errType}s`
  });
  process.exit(1);
};

process.on('uncaughtException', err => uncaughtErrorHandler('uncaughtException', err));
process.on('unhandledRejection', err => uncaughtErrorHandler('unhandledRejection', err));
