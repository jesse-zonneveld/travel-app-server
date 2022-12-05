/**
 * @file routes/index.ts
 * @author Jesse Zonneveld
 * @description Routes
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { Router, Response } from 'express';
import authRouter from './auth.routes';
import userRouter from './user.routes';

/* --------------------------------- ROUTER --------------------------------- */

const router = Router();

router.get('/api/v1/healthcheck', (_, res: Response) => res.sendStatus(200));
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/users', userRouter);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default router;

/* -------------------------------------------------------------------------- */
