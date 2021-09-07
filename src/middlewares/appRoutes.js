'use strict';

const express = require('express');
const validator = require('express-joi-validation').createValidator({ passError: true });

const config = require('../config');
const controllers = require('../controllers');

// All handlers wrapped inside _wrapAsyncFn to have centralized error handling, so from handlers
// just need to throw appropriate type of error with corresponding message and it will be handled automatically
const _wrapAsyncFn = handler => {
  return async (...args) => {
    try {
      await handler(...args);
    } catch (err) {
      // passing error to next (errorHandler) middleware
      args[2](err); // args[2] === next
    }
  };
};

module.exports = () => {
  const routes = express.Router();
  for (const actionKey in controllers) {
    const { method, route, validation, handler } = controllers[actionKey];
    let validatorMiddleWares = [];

    if (validation) {
      validatorMiddleWares = ['query', 'params', 'body'].map(type =>
        validation.hasOwnProperty(type) ? validator[type](validation[type]) : null
      ).filter(i => i);
    }

    const normalizedMethod = method.toLowerCase();
    if (!['get', 'post', 'patch', 'delete', 'put'].includes(normalizedMethod)) {
      throw new Error(`Unknown HTTP method = ${method} for ${actionKey} action`);
    }

    routes[normalizedMethod](route, ...validatorMiddleWares, _wrapAsyncFn(handler));
  }

  return { routes };
};
