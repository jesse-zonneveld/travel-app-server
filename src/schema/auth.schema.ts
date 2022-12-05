/**
 * @file schema/auth.schema.ts
 * @author Jesse Zonneveld
 * @description Auth schema
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { object, string, TypeOf } from 'zod';

/* -------------------------------------------------------------------------- */

/* ------------------------------ LOGIN SCHEMA ------------------------------ */

export const loginSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Email not valid'),
        password: string({
            required_error: 'Password is required',
        }),
    }),
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export type LoginInput = TypeOf<typeof loginSchema>['body'];

/* -------------------------------------------------------------------------- */
