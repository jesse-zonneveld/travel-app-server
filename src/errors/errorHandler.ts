/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file errors/errorHandler.ts
 * @author Jesse Zonneveld
 * @description Error handler
 */

/* --------------------------------- IMPORTS -------------------------------- */

import BaseError from './baseError';
import { logger } from '../utils/logger';
import { NextFunction, Request, Response } from 'express';

/* -------------------------------------------------------------------------- */

/* ---------------------------- HELPER FUNCTIONS ---------------------------- */

const getValidationErrors = (errorsArray: any[]) => {
    const errors: any = {};

    errorsArray.forEach((error) => {
        errors[error.message.split(' ')[0].toLowerCase()] = error.message;
    });

    return errors;
};

const logError = (err: any, req: Request | null = null) => {
    if (req) {
        if (err.name === 'AuthorizationError') {
            logger.error(
                `${err.status || 500} - ${err.name} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
            );
        } else {
            logger.error(
                `${err.status || 500} - ${err.name} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
                    req.ip
                } - ${err.stack}`,
            );
        }
    } else {
        logger.error(`${err.status || 500} - ${err.name} - ${err.message} - ${err.stack}`);
    }
};

const isOperationalError = (err: any) => {
    if (err instanceof BaseError) {
        return err.isOperational;
    }
    return false;
};

process.on('unhandledRejection', (err) => {
    throw err;
});

process.on('uncaughtException', (err) => {
    logError(err);

    if (!isOperationalError(err)) {
        process.exit(1);
    }
});

/* -------------------------------------------------------------------------- */

/* -------------------------- LOG ERROR MIDDLEWARE -------------------------- */

const logErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    logError(err, req);
    next(err);
};

/* -------------------------------------------------------------------------- */

/* ------------------------------ RETURN ERROR ------------------------------ */

const returnError = (err: any, req: Request, res: Response, next: NextFunction) => {
    switch (err.name) {
        case 'ZodError':
            res.status(err.statusCode || 500).json({
                errors: {
                    validationError: getValidationErrors(Object.values(err.errors)),
                },
            });
            break;

        default:
            res.status(err.statusCode || 500).json({
                errors: {
                    [err.name]: err.message,
                },
            });
            break;
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { logError, logErrorMiddleware, returnError, isOperationalError };

/* -------------------------------------------------------------------------- */
