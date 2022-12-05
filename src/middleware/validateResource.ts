/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file middleware/validateResource.ts
 * @author Jesse Zonneveld
 * @description Validates incoming resources
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

/* -------------------------------------------------------------------------- */

/* --------------------------- VALIDATE RESOURCES --------------------------- */

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    } catch (err) {
        return next(err);
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default validateResource;

/* -------------------------------------------------------------------------- */
