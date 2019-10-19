import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        const uuid = await userService.register(req.body.username,req.body.password);
        return res.json({'uuid':uuid}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Register new user failed', 200));
    }
};

