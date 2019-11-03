import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('groupService');

    try {
        const uuid = await groupService.createGroup(req.body);
        return res.json({'uuid':uuid}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Create new group failed', 200));
    }
};

