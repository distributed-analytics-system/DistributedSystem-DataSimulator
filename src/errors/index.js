'use strict';

const { CustomError, BadRequest, NotFound, InternalServerError, ForbiddenError } = require('./errors');

module.exports = {
  CustomError,
  BadRequest,
  NotFound,
  InternalServerError,
  ForbiddenError
};
