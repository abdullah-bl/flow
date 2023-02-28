import winston, { format } from 'winston'




// export const logger = createLogger({
//   level: 
//   format: format.combine(format.timestamp(), format.json()),
//   transports: [new transports.File({ filename: "logs/info.log" })],
//   exceptionHandlers: [new transports.File({ filename: "logs/exceptions.log" })],
//   rejectionHandlers: [new transports.File({ filename: "logs/rejections.log" })],
// })  

const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false
})
