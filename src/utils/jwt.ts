/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file utils/jwt.ts
 * @author Jesse Zonneveld
 * @description Jwt signing and verifying
 */

/* --------------------------------- IMPORTS -------------------------------- */

import jwt from 'jsonwebtoken';
import config from '../config';

/* -------------------------------------------------------------------------- */

/* ---------------------------------- TYPES --------------------------------- */

interface AccessToken {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
}

interface RefreshToken {
    sessionId: string;
    iat: number;
    exp: number;
}

/* -------------------------------------------------------------------------- */

/* -------------------------------- SING JWT -------------------------------- */

const signJwt = (object: Object, keyName: 'accessToken' | 'refreshToken', options?: jwt.SignOptions | undefined) => {
    const privateKey = Buffer.from(config[keyName].privateKey, 'base64').toString('ascii');

    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    });
};

/* -------------------------------------------------------------------------- */

/* ------------------------------- VERIFY JWT ------------------------------- */

const verifyJwt = <T>(token: string, keyName: 'accessToken' | 'refreshToken'): T | null => {
    const publicKey = Buffer.from(config[keyName].publicKey, 'base64').toString('ascii');

    try {
        const decoded = jwt.verify(token, publicKey) as T;
        return decoded;
    } catch (err: any) {
        console.log(err);
        return null;
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { signJwt, verifyJwt, AccessToken, RefreshToken };

/* -------------------------------------------------------------------------- */
