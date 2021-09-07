'use strict';

const handler = require('./handler');
const Joi = require('joi');

const validation = {
  query: Joi.object({
    recordCount: Joi.number().positive().required()
  })
};

module.exports = {
  method: 'get',
  route: '/v1/simulate',
  validation,
  handler
};
