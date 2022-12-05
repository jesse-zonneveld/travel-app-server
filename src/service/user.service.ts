/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @file service/user.service.ts
 * @author Jesse Zonneveld
 * @description Auth service
 */

/* --------------------------------- IMPORTS -------------------------------- */

import UserModel, { User } from '../models/user.model';

/* -------------------------------------------------------------------------- */

/* --------------------------- USER SERVICE CLASS --------------------------- */

class UserService {
    createUser = async (input: Partial<User>) => {
        const user = await UserModel.create(input);
        return user;
    };

    findUserById = async (id: string) => {
        const user = await UserModel.findById(id);
        return user;
    };

    findUserByEmail = async (email: string) => {
        const user = await UserModel.findOne({ email });
        return user;
    };
}

/* -------------------------------------------------------------------------- */

/* --------------------------------- EXPORTS -------------------------------- */

export default new UserService();

/* -------------------------------------------------------------------------- */
