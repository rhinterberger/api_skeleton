import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        const uuid = await userService.createUser(req.body);
        return res.json({'uuid':uuid}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Create new user failed', 200));
    }
};

