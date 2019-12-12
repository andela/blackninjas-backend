import log4js from 'log4js';
import { config } from 'dotenv';

config();

/**
 * This function helps you to log message on console or in log file -
 * if application is running in production environment
 * @param {object} level log level. It can be trace, debug, info, warn, error or fatal.
 * @param {object} message this is the massage you want to log
 * @return {object} null.
 */
export default (level = 'debug', message) => {
  let log;
  if (process.env.NODE_ENV === 'production') {
    log4js.configure({
      appenders: { barefootnomad: { type: 'file', filename: 'barefootnomad.log' } },
      categories: { default: { appenders: ['barefootnomad'], level } }
    });
    log = log4js.getLogger('barefootnomad');
  } else {
    log = log4js.getLogger();
  }
  log.level = level;
  switch (level) {
    case 'trace':
      log.trace(message);
      break;
    case 'debug':
      log.debug(message);
      break;
    case 'info':
      log.info(message);
      break;
    case 'warn':
      log.warn(message);
      break;
    case 'error':
      log.error(message);
      break;
    case 'fatal':
      log.fatal(message);
      break;
    default:
      break;
  }
};
