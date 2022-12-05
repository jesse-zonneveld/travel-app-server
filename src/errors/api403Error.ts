/**
 * @file error/api403Error.ts
 * @author Jesse Zonneveld
 * @description Error class for 403 errors
 */

/* --------------------------------- IMPORTS -------------------------------- */

import httpStatusCodes from './httpStatusCodes';
import BaseError from './baseError';

/* -------------------------------------------------------------------------- */

/* ------------------------------- ERROR CLASS ------------------------------ */

class Api403Error extends BaseError {
    constructor(
        message = 'Not authorized.',
        name = 'AuthorizationError',
        statusCode = httpStatusCodes.FORBIDDEN,
        isOperational = true,
    ) {
        super(message, name, statusCode, isOperational);
    }
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default Api403Error;

/* -------------------------------------------------------------------------- */
