/**
 * @file models/session.model.ts
 * @author Jesse Zonneveld
 * @description Session model
 */

/* --------------------------------- IMPORTS -------------------------------- */

import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

/* -------------------------------------------------------------------------- */

/* --------------------------------- OPTIONS -------------------------------- */

@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
})

/* -------------------------------------------------------------------------- */

/* ------------------------------- MODEL CLASS ------------------------------ */
export class Session {
    @prop({
        ref: () => User,
        required: true,
    })
    userId: Ref<User>;

    @prop({ default: true })
    valid: boolean;

    @prop({ required: true })
    userAgent: string;
}

const SessionModel = getModelForClass(Session);

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default SessionModel;

/* -------------------------------------------------------------------------- */
