/**
 * @file config/config.ts
 * @author Jesse Zonneveld
 * @description Config variables
 */

/* ----------------------------- IMPORTS & SETUP ---------------------------- */

import dotenv from 'dotenv';
dotenv.config();

/* -------------------------------------------------------------------------- */

/* ---------------------------- CONFIG VARIABLES ---------------------------- */

const config = {
    dbUri: process.env.DB_URI,
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    accessToken: {
        timeToLive: process.env.ACCESS_TOKEN_TTL,
        privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
        publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    },
    refreshToken: {
        timeToLive: process.env.REFRESH_TOKEN_TTL,
        privateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
        publicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY,
    },
    smtp: {
        fromEmail: process.env.SMTP_FROM_EMAIL,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
    },
};

/* --------------------------------- EXPORTS -------------------------------- */

export default config;

/* -------------------------------------------------------------------------- */
