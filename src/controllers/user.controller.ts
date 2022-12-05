/**
 * @file controllers/user.controller.ts
 * @author Jesse Zonneveld
 * @description User controller
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import config from '../config';
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from '../schema/user.schema';
import authService from '../service/auth.service';
import userService from '../service/user.service';
import { logger } from '../utils/logger';
import sendEmail from '../utils/mailer';

/* -------------------------------------------------------------------------- */

/* -------------------------- USER CONTROLLER CLASS ------------------------- */

class UserController {
    createUser = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of UserController createUser');

            const user = await userService.createUser(req.body);

            await sendEmail({
                from: config.smtp.fromEmail,
                to: user.email,
                subject: 'Verify your account',
                text: `Verification code: ${user.verificationCode} Id = ${user._id}`,
            });

            res.status(201).json({
                success: true,
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    verifyUser = async (req: Request<VerifyUserInput>, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of UserController verifyUser');

            const id = req.params.id;
            const verificationCode = req.params.verificationCode;

            const user = await userService.findUserById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            if (user.verified) {
                return res.status(409).json({
                    success: false,
                    message: 'User already verified',
                    data: user,
                });
            }

            if (user.verificationCode === verificationCode) {
                user.verified = true;
                await user.save();

                return res.status(200).json({
                    success: true,
                    message: 'User successfully verified',
                    data: user,
                });
            }

            return res.status(422).json({
                success: false,
                message: 'Could not verify user',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    forgotPassword = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of UserController forgotPassword');

            const email = req.body.email;

            const user = await userService.findUserByEmail(email);

            if (!user) {
                logger.debug(`User with email: ${email} does not exist`);
                return res.status(200).json({
                    success: true,
                    message: 'Please check the email you provided and follow the password reset instructions',
                });
            }

            if (!user.verified) {
                return res.status(200).json({
                    success: false,
                    message: 'User is not verified',
                    data: user,
                });
            }

            const passwordResetCode = nanoid();

            user.passwordResetCode = passwordResetCode;

            await user.save();

            await sendEmail({
                from: config.smtp.fromEmail,
                to: user?.email,
                subject: 'Reset Password',
                text: `Password reset code: ${passwordResetCode}    Id = ${user?._id}`,
            });

            logger.debug(`Password reset email send to ${email}`);
            return res.status(200).json({
                success: true,
                message: 'Please check the email you provided and follow the password reset instructions',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    resetPassword = async (
        req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            logger.info('Start of UserController resetPassword');

            const { id, passwordResetCode } = req.params;
            const { password } = req.body;

            const user = await userService.findUserById(id);

            if (!user) {
                logger.debug(`User with id: ${id} does not exist`);

                return res.status(400).json({
                    success: false,
                    message: 'Could not reset password',
                });
            }

            if (!user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
                res.status(400).json({
                    success: false,
                    message: 'Could not reset password',
                });
            }

            user.passwordResetCode = null;
            user.password = password;

            await user.save();

            await authService.deleteAllSessionsByUserId(id);

            return res.status(200).json({
                success: true,
                message: 'Successfully changed password',
                data: user,
            });
        } catch (err) {
            next(err);
        }
    };

    getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info('Start of UserController getCurrentUser');

            return res.status(200).json({
                success: true,
                data: res.locals.user,
            });
        } catch (err) {
            next(err);
        }
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new UserController();

/* -------------------------------------------------------------------------- */
