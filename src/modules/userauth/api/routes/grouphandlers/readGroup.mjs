import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        const group = await groupService.getGroupById(req.params.uuid);
        return res.json({'group': group}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List single group failed', 200));
    }
};

