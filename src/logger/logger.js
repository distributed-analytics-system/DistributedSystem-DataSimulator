'use strict';
const logHandler = require('./logHandler');

/*
  Used default logging levels, which is syslog levels:
  Note: Logging function names are corresponding logging level names which prioritized from 0 to 5 (highest to lowest)
*/
const logLevels = {
  error: 'error',
  warn: 'warn',
  info: 'info',
  verbose: 'verbose',
  debug: 'debug',
  silly: 'silly'
};

const paramsMod = params => typeof params === 'string' ? { message: params } : params;

module.exports = {
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  error: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.error, {message: opt.message, metricsStat: opt.metricsStat || 'errors', id: opt.id || null});
  },
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  warn: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.warn, {message: opt.message, metricsStat: opt.metricsStat || 'warnings', id: opt.id || null});
  },
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  info: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.info, {message: opt.message, metricsStat: opt.metricsStat || null, id: opt.id || null});
  },
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  verbose: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.verbose, {message: opt.message, metricsStat: opt.metricsStat || null, id: opt.id || null});
  },
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  debug: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.debug, {message: opt.message, metricsStat: opt.metricsStat || null, id: opt.id || null});
  },
  /**
   * @param opt {{message, metricStat, id}|String}
   */
  silly: (opt) => {
    opt = paramsMod(opt);
    logHandler(logLevels.silly, {message: opt.message, metricsStat: opt.metricsStat || null, id: opt.id || null});
  }
};
