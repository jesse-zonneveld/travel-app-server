/**
 * @file app.ts
 * @author Jesse Zonneveld
 * @description App
 */

/* --------------------------------- IMPORTS -------------------------------- */

import express from 'express';
import config from './config';
import connectDB from './config/connectDB';
import { logger, streams } from './utils/logger';
import router from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { logErrorMiddleware, returnError } from './errors/errorHandler';
import deserializeUser from './middleware/deserializeUser';
import { cleanUpExpiredSessions } from './utils/cronJobs';

/* -------------------------------------------------------------------------- */

/* -------------------------------- APP SETUP ------------------------------- */

const app = express();
const port = config.port;

/* -------------------------------------------------------------------------- */

/* ------------------------ MIDDLEWARE BEFORE ROUTES ------------------------ */

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(morgan('combined', { stream: streams.debug }));
app.use(morgan('combined', { stream: streams.prod }));
app.use(cookieParser());
app.use(deserializeUser);

/* -------------------------------------------------------------------------- */

/* --------------------------------- ROUTES --------------------------------- */

app.use(router);

/* -------------------------------------------------------------------------- */

/* ------------------------- MIDDLEWARE AFTER ROUTES ------------------------ */

app.use(logErrorMiddleware);
app.use(returnError);

/* -------------------------------------------------------------------------- */

/* ----------------------------- APP CONNECTION ----------------------------- */

app.listen(port, async () => {
    logger.info(`Server is running at https://localhost:${port}`);
    await connectDB();

    cleanUpExpiredSessions;
});

/* -------------------------------------------------------------------------- */
