'use strict';

const handler = require('./handler');
const Joi = require('joi');

const validation = {
  query: Joi.object({
    userCount: Joi.number().positive().required(),
    recordCount: Joi.number().positive().required()
  })
};

module.exports = {
  method: 'post',
  route: '/v1/simulate',
  validation,
  handler
};
