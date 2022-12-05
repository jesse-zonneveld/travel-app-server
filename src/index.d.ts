/**
 * @file index.d.ts
 * @author Jesse Zonneveld
 * @description Typescript global types
 */

/* --------------------------------- IMPORTS -------------------------------- */

import 'express';

/* -------------------------------------------------------------------------- */

/* -------------------------- RESPONSE LOCALS TYPE -------------------------- */

interface Locals {
    user: { _id: string; email: string; firstName: string; lastName: string };
}

declare module 'express' {
    export interface Response {
        locals: Locals;
    }
}

/* -------------------------------------------------------------------------- */

/* ----------------------- ENVIRONMENT VARIABLE TYPES ----------------------- */

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: number;
            DB_URI: string;
            SMTP_FROM_EMAIL: string;
            SMTP_USER: string;
            SMTP_PASS: string;
            SMTP_HOST: string;
            SMTP_PORT: number;
            ACCESS_TOKEN_TTL: string;
            REFRESH_TOKEN_TTL: string;
            ACCESS_TOKEN_PRIVATE_KEY: string;
            ACCESS_TOKEN_PUBLIC_KEY: string;
            REFRESH_TOKEN_PRIVATE_KEY: string;
            REFRESH_TOKEN_PUBLIC_KEY: string;
        }
    }
}

/* -------------------------------------------------------------------------- */
