import winston from 'winston';
const { MESSAGE } = require('triple-beam');
export function createLogger(loggerName: string = 'app') {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { loggerName },
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });
  const myFormat = winston.format.printf((a) => {
    const { timestamp } = a;
    return `${timestamp} | [${a.loggerName}]: ${a[MESSAGE]}`;
  });
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          // winston.format.json(),
          // winston.format.metadata(),
          // winston.format.prettyPrint(),
          winston.format.splat(),
          winston.format.simple(),
          myFormat
        ),
      })
    );
  }
  return logger;
}
