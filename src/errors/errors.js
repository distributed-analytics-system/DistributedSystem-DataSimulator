const { v4: uuid } = require('uuid');

const paramsMod = params => typeof params === 'string' ? { message: params } : params;

// Base class for application custom errors
/**
 * @constructor
 * @param {{ name, statusCode, message, details, stack, id }}
 */
class CustomError extends Error {
  constructor ({ name, statusCode, message, details, stack, id = uuid() }) {
    super();
    this.message = message || name;
    this.details = details;
    this.name = name;
    this.statusCode = statusCode;
    this.timestamp = (new Date()).toISOString();
    if (stack) this.stack = stack;
    this.id = id;
  }
}

class BadRequest extends CustomError {
  /**
   * @constructor
   * @param {{ message, details, stack, id }} params
   */
  constructor (params) {
    super({
      name: 'BadRequest',
      statusCode: 400,
      ...paramsMod(params)
    });
  }
}

class NotFound extends CustomError {
  /**
   * @constructor
   * @param {{ message, details, stack, id }} params
   */
  constructor (params) {
    super({
      name: 'NotFound',
      statusCode: 404,
      ...paramsMod(params)
    });
  }
}

class InternalServerError extends CustomError {
  /**
   * @constructor
   * @param {{ message, details, stack, id }} params
   */
  constructor (params) {
    super({
      name: 'InternalServerError',
      statusCode: 500,
      ...paramsMod(params)
    });
  }
}

class ForbiddenError extends CustomError {
  /**
   * @constructor
   * @param {{ message, details, stack, id }} params
   */
  constructor (params) {
    super({
      name: 'ForbiddenError',
      statusCode: 403,
      ...paramsMod(params)
    });
  }
}

module.exports = {
  CustomError,
  BadRequest,
  NotFound,
  InternalServerError,
  ForbiddenError
};
