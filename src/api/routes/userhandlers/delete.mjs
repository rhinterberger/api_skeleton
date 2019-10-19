import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        await userService.deleteUser(req.params.uuid);
        return res.json({'success':'delete'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Delete user failed'));
    }
};

