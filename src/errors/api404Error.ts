/**
 * @file error/api404Error.ts
 * @author Jesse Zonneveld
 * @description Error class for 404 errors
 */

/* --------------------------------- IMPORTS -------------------------------- */

import httpStatusCodes from './httpStatusCodes';
import BaseError from './baseError';

/* -------------------------------------------------------------------------- */

/* ------------------------------- ERROR CLASS ------------------------------ */

class Api404Error extends BaseError {
    constructor(
        message = 'Not found.',
        name = 'NotFoundError',
        statusCode = httpStatusCodes.NOT_FOUND,
        isOperational = true,
    ) {
        super(message, name, statusCode, isOperational);
    }
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default Api404Error;

/* -------------------------------------------------------------------------- */
