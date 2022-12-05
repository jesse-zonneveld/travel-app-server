/**
 * @file controllers/auth.controller.ts
 * @author Jesse Zonneveld
 * @description Auth controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { LoginInput } from '../schema/auth.schema';
import authService from '../service/auth.service';
import userService from '../service/user.service';
import { RefreshToken, verifyJwt } from '../utils/jwt';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* -------------------------- AUTH CONTROLLER CLASS ------------------------- */

class AuthController {
    login = async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of AuthController login');

            const { email, password } = req.body;
            const user = await userService.findUserByEmail(email);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password',
                });
            }

            if (!user.verified) {
                return res.status(400).json({
                    success: false,
                    message: 'Please verify your email',
                    data: user,
                });
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid username or password',
                    data: user,
                });
            }

            const session = await authService.createSession(user._id, req.get('user-agent') || 'unknown');

            const accessToken = await authService.signAccessToken(user);
            const refreshToken = await authService.signRefreshToken(session._id);

            return res.status(200).json({
                success: true,
                message: 'Successful login',
                data: { user, tokens: { accessToken, refreshToken } },
            });
        } catch (err) {
            next(err);
        }
    };

    refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of AuthController refreshAccessToken');

            const refreshToken = get(req, 'headers.x-refresh') as string;

            const decoded = verifyJwt<RefreshToken>(refreshToken, 'refreshToken');

            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: 'Could not refresh access token',
                });
            }

            const session = await authService.findSessionById(decoded.sessionId);

            if (!session || !session.valid) {
                return res.status(401).json({
                    success: false,
                    message: 'Could not refresh access token',
                });
            }

            const user = await userService.findUserById(String(session.userId));

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Could not refresh access token',
                });
            }

            const accessToken = await authService.signAccessToken(user);

            return res.status(200).json({
                success: true,
                message: 'Successfully refreshed access token',
                data: { user, tokens: { accessToken } },
            });
        } catch (err) {
            next(err);
        }
    };

    logout = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('start of AuthController logout');

            const refreshToken = get(req, 'headers.x-refresh') as string;

            const decoded = verifyJwt<RefreshToken>(refreshToken, 'refreshToken');

            if (!decoded) {
                return res.status(400).json({
                    success: false,
                    message: 'No refreshToken found to get session id',
                });
            }

            const result = await authService.deleteSessionById(decoded.sessionId);
            console.log(result);

            return res.status(200).json({
                success: true,
                message: 'Successfully logged out of current session',
            });
        } catch (err) {
            next(err);
        }
    };

    logoutAllDevices = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('start of AuthController logoutAllDevices');

            const result = await authService.deleteAllSessionsByUserId(res.locals.user._id);
            console.log(result);

            return res.status(200).json({
                success: true,
                message: 'Successfully logged out of all sessions',
            });
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new AuthController();

/* -------------------------------------------------------------------------- */
