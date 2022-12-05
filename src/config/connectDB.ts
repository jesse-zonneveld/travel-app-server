/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file config/connectDB.ts
 * @author Jesse Zonneveld
 * @description Database connection setup
 */

/* --------------------------------- IMPORTS -------------------------------- */

import mongoose from 'mongoose';
import config from './index';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ------------------------------ DB CONNECTION ----------------------------- */

const connectDB = async () => {
    try {
        const dbURI = config.dbUri;
        await mongoose.connect(dbURI);
        logger.info('DB connected');
    } catch (err: any) {
        logger.error(err.message);
        process.exit(1);
    }
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default connectDB;

/* -------------------------------------------------------------------------- */
