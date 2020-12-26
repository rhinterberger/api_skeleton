import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        const users = await userService.getAllUsers();
        return res.json({'users':users}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List all users failed', 200));
    }
};

