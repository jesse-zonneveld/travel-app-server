/**
 * @file service/auth.service.ts
 * @author Jesse Zonneveld
 * @description Auth service
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import config from '../config';
import SessionModel from '../models/session.model';
import { User, userPrivateFields } from '../models/user.model';
import { signJwt } from '../utils/jwt';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* --------------------------- AUTH SERVICE CLASS --------------------------- */

class AuthService {
    createSession = async (userId: string, userAgent: string) => {
        const session = await SessionModel.create({ userId, userAgent });
        await SessionModel.collection;
        return session;
    };

    findSessionById = async (id: string) => {
        const session = await SessionModel.findById(id);
        return session;
    };

    deleteExpiredSessions = async () => {
        const sessionTtl = +config.refreshToken.timeToLive.split('s')[0];
        const validCreatedAt = new Date();
        validCreatedAt.setSeconds(validCreatedAt.getSeconds() - sessionTtl);
        // console.log(new Date());
        // console.log(validCreatedAt);
        const result = await SessionModel.deleteMany({ createdAt: { $lte: validCreatedAt } });

        logger.info(result);
    };

    deleteSessionById = async (id: string) => {
        const result = await SessionModel.findByIdAndDelete(id);
        logger.info(result);
        return result;
    };

    deleteAllSessionsByUserId = async (userId: string) => {
        const result = await SessionModel.deleteMany({ userId });
        logger.info(result);
        return result;
    };

    signAccessToken = async (user: DocumentType<User>) => {
        const payload = omit(user.toJSON(), userPrivateFields);
        const accessToken = signJwt(payload, 'accessToken', {
            expiresIn: config.accessToken.timeToLive,
        });
        return accessToken;
    };

    signRefreshToken = async (sessionId: string) => {
        const refreshToken = signJwt({ sessionId }, 'refreshToken', {
            expiresIn: config.refreshToken.timeToLive,
        });
        return refreshToken;
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new AuthService();

/* -------------------------------------------------------------------------- */
