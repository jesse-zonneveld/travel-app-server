/**
 * @file routes/user.routes.ts
 * @author Jesse Zonneveld
 * @description User routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

import express from 'express';
import userController from '../controllers/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTER --------------------------------- */

const userRouter = express.Router();

userRouter.post('/register', validateResource(createUserSchema), userController.createUser);
// Change this to a get request if link is provided in email
userRouter.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), userController.verifyUser);
userRouter.post('/forgot-password', validateResource(forgotPasswordSchema), userController.forgotPassword);
userRouter.post(
    '/reset-password/:id/:passwordResetCode',
    validateResource(resetPasswordSchema),
    userController.resetPassword,
);
userRouter.get('/me', requireUser, userController.getCurrentUser);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default userRouter;

/* -------------------------------------------------------------------------- */
