/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file models/user.model.ts
 * @author Jesse Zonneveld
 * @description User model
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { getModelForClass, modelOptions, prop, Severity, pre, index } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';

/* -------------------------------------------------------------------------- */

/* ----------------------------- PRIVATE FIELDS ----------------------------- */

export const userPrivateFields = [
    'password',
    '__v',
    'verificationCode',
    'passwordResetCode',
    'verified',
    'createdAt',
    'updatedAt',
];

/* -------------------------------------------------------------------------- */

/* --------------------------- PRE SAVE FUNCTIONS --------------------------- */

@pre<User>('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return;
})
/* -------------------------------------------------------------------------- */

/* ---------------------------------- INDEX --------------------------------- */

@index({
    email: 1,
})
/* -------------------------------------------------------------------------- */

/* --------------------------------- OPTIONS -------------------------------- */

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    },
})

/* -------------------------------------------------------------------------- */

/* ------------------------------- MODEL CLASS ------------------------------ */
export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string;

    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string;

    @prop()
    passwordResetCode: string | null;

    @prop({ default: false })
    verified: boolean;

    async validatePassword(candidatePassword: string) {
        try {
            return await bcrypt.compare(candidatePassword, this.password);
        } catch (err: any) {
            logger.error(err, 'could not validate password');
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default UserModel;

/* -------------------------------------------------------------------------- */
