'use strict';
const { v4: uuid } = require('uuid');
const bodyParser = require('body-parser');
const swaggerDocs = require('./swaggerDocs');
const { routes } = require('./appRoutes')();
const requestLogger = require('./requestLogger');
const errorHandler = require('./errorHandler');

module.exports = (app) => {
  app.use(requestLogger);
  app.use((req, res, next) => {
    req.metadata = { reqId: uuid() };
    next();
  });
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ type: () => true }));
  app.use('/swagger', swaggerDocs);
  // app.use('/healthz', healthz); TODO
  app.use(routes);
  app.use(errorHandler);
};
