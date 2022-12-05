/**
 * @file utils/logger.ts
 * @author Jesse Zonneveld
 * @description Logger
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

/* -------------------------------------------------------------------------- */

/* ----------------------------- LOGGER FUNCTION ---------------------------- */

const logger = createLogger({
    transports: [
        // Production transports
        new transports.File({
            filename: 'logs/server.prod.log',
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
        // Development transports
        new transports.File({
            filename: 'logs/server.dev.log',
            level: 'debug',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
            format: format.combine(
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.colorize({ all: true }),
                format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
                format.align(),
                format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`),
            ),
        }),
    ],
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- STREAMS -------------------------------- */

const serverDebugLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/server.dev.log'), { flags: 'a' });
const serverProdLogStream = fs.createWriteStream(path.join(__dirname, '../../logs/server.prod.log'), { flags: 'a' });

const streams = {
    debug: serverDebugLogStream,
    prod: serverProdLogStream,
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { logger, streams };

/* -------------------------------------------------------------------------- */
