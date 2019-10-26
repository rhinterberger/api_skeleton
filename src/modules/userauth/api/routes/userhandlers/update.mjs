import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        req.body.uuid=req.params.uuid;
        await userService.updateUser(req.body);
        return res.json({'success':'update'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Update user failed', 200));
    }
};

