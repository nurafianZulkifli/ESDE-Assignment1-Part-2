const winston = require('winston');

module.exports.logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/log-info.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),

        new winston.transports.File({
            level: 'error',
            filename: './logs/log-error.log',
            json: true,
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
    ]
});