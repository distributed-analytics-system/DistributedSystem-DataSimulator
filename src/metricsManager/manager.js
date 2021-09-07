'use strict';

const StatsD = require('hot-shots');

const { nodeEnv, dataDogHost } = require('../config');
const { environments } = require('../constants');
const pckg = require('../../package.json');

class MetricsManager {
  constructor () {
    this.statsdInstance = new StatsD({
      host: dataDogHost,
      protocol: [environments.dev, environments.tst].includes(process.env.NODE_ENV)
        ? 'stream'
        : process.env.STATSD_PROTOCOL || 'udp',
      stream: process.stdout, // Only used when protocol is stream
      prefix: `${pckg.name}.`,
      globalTags: { env: nodeEnv },
      errorHandler: error => {
        console.error(`hot-shots UDS error: ${error.message}`);
      }
    });
  }

  asyncTimer (callback, label) {
    return this.statsdInstance.asyncTimer(callback, label)();
  }

  increment (stat, tags) {
    this.statsdInstance.increment(stat, tags);
  }

  decrement (stat) {
    this.statsdInstance.decrement(stat);
  }
}

module.exports = new MetricsManager();
