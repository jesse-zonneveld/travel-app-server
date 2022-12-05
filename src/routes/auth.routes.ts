/**
 * @file routes/auth.routes.ts
 * @author Jesse Zonneveld
 * @description Auth routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

import express from 'express';
import authController from '../controllers/auth.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { loginSchema } from '../schema/auth.schema';

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTER --------------------------------- */

const authRouter = express.Router();

authRouter.post('/login', validateResource(loginSchema), authController.login);
authRouter.post('/refresh', authController.refreshAccessToken);
authRouter.post('/logout', authController.logout);
authRouter.post('/logout-all', requireUser, authController.logoutAllDevices);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default authRouter;

/* -------------------------------------------------------------------------- */
