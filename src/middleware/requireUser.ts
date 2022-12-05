/**
 * @file middleware/requireUser.ts
 * @author Jesse Zonneveld
 * @description Require user middleware for private routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Request, Response, NextFunction } from 'express';

/* -------------------------------------------------------------------------- */

/* ------------------------------ REQUIRE USER ------------------------------ */

const requireUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = res.locals.user;

        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
            });
        }

        return next();
    } catch (err) {
        next(err);
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default requireUser;

/* -------------------------------------------------------------------------- */
