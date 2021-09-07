const { str, port, num } = require('envalid');

module.exports = {
  nodeEnv: {
    name: 'NODE_ENV',
    validator: str({choices: ['development', 'production']})
  },
  port: {
    name: 'PORT',
    validator: port()
  },
  logLevel: {
    name: 'LOG_LEVEL',
    validator: str({choices: ['error', 'warn', 'info', 'verbose', 'debug', 'silly']})
  },
};
