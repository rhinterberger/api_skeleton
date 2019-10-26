import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        const user = await userService.getUserByUuid(req.params.uuid);
        return res.json({'user':user}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List single users failed', 200));
    }
};

