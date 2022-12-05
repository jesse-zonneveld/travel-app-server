/**
 * @file utils/cronJobs.ts
 * @author Jesse Zonneveld
 * @description Cron jobs
 */

/* --------------------------------- IMPORTS -------------------------------- */

import cron from 'node-cron';
import authService from '../service/auth.service';
import { logger } from './logger';

/* -------------------------------------------------------------------------- */

/* --------------------------------- TIMERS --------------------------------- */

// const everyTenSeconds = '*/10 * * * * *';
const everyOneDay = '* * */24 * * *';

/* -------------------------------------------------------------------------- */

/* ------------------------- CLEANUP EXPIRED TOKENS ------------------------- */

const cleanUpExpiredSessions = cron.schedule(everyOneDay, async () => {
    try {
        console.log('running cleanUpExpiredSessions');
        await authService.deleteExpiredSessions();
    } catch (err) {
        logger.info(err);
    }
});

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export { cleanUpExpiredSessions };

/* -------------------------------------------------------------------------- */
