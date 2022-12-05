/**
 * @file middleware/deserializeUser.ts
 * @author Jesse Zonneveld
 * @description Deserialize user from access token if provided in request
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Request, Response, NextFunction } from 'express';
import { AccessToken, verifyJwt } from '../utils/jwt';

/* -------------------------------------------------------------------------- */

/* ----------------------------- DESERIALZE USER ---------------------------- */

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '');

    if (!accessToken) {
        return next();
    }

    const decoded = verifyJwt<AccessToken>(accessToken, 'accessToken');

    if (decoded) {
        res.locals.user = {
            _id: decoded._id,
            email: decoded.email,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
        };
    }

    return next();
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default deserializeUser;

/* -------------------------------------------------------------------------- */
