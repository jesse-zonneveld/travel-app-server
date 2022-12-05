/**
 * @file schema/user.schema.ts
 * @author Jesse Zonneveld
 * @description User schema
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { object, string, TypeOf } from 'zod';

/* -------------------------------------------------------------------------- */

/* --------------------------- CREATE USER SCHEMA --------------------------- */

export const createUserSchema = object({
    body: object({
        firstName: string({
            required_error: 'First name is required',
        }),
        lastName: string({
            required_error: 'Last name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password must be atleast 8 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required',
        }),
        email: string({
            required_error: 'Email is required',
        }).email('Email not valid'),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
    }),
});

/* -------------------------------------------------------------------------- */

/* --------------------------- VERIFY USER SCHEMA --------------------------- */

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string(),
    }),
});

/* -------------------------------------------------------------------------- */

/* ------------------------- FORGOT PASSWORD SCHEMA ------------------------- */

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Email not valid'),
    }),
});

/* -------------------------------------------------------------------------- */

/* -------------------------- RESET PASSWORD SCHEMA ------------------------- */

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string(),
    }),
    body: object({
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password must be atleast 8 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required',
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
    }),
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

/* -------------------------------------------------------------------------- */
