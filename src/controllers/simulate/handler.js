'use strict';

const logger = require('../../logger');
const error = require('../../errors');

module.exports = async (req, res) => {
  const {
    query: { recordCount },
    metadata: { reqId }
  } = req;

  logger.debug({ message: 'Simulating user behavioral data', id: reqId });
  try {
    // TODO
  } catch (err) {
    throw new error.InternalServerError({ message: err.message });
  }

  res.status(201).end();
};
