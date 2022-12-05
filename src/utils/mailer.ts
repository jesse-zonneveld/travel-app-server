/**
 * @file utils/mailer.ts
 * @author Jesse Zonneveld
 * @description Mailer
 */

/* --------------------------------- IMPORTS -------------------------------- */

import nodeMailer, { SendMailOptions } from 'nodemailer';
import config from '../config';
import { logger } from './logger';

/* -------------------------------------------------------------------------- */

/* ---------------------------- CREATE TEST CREDS --------------------------- */

// const createTestCreds = async () => {
//     const creds = await nodeMailer.createTestAccount();
//     console.log(creds);
// };

// createTestCreds();

/* -------------------------------------------------------------------------- */

/* ------------------------------- SMPT SETUP ------------------------------- */

const smtp = config.smtp;

const transporter = nodeMailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    auth: {
        user: smtp.user,
        pass: smtp.pass,
    },
});

const sendEmail = async (payload: SendMailOptions) => {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        logger.info(`preview url: ${nodeMailer.getTestMessageUrl(info)}`);
    });
};

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default sendEmail;

/* -------------------------------------------------------------------------- */
