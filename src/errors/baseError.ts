/**
 * @file error/baseError.ts
 * @author Jesse Zonneveld
 * @description Base error class for custom errors
 */

/* ------------------------------- ERROR CLASS ------------------------------ */

class BaseError extends Error {
    name: string;
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, name: string, statusCode: number, isOperational: boolean) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default BaseError;

/* -------------------------------------------------------------------------- */
