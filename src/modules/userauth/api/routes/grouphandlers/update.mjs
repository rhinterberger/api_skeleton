import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        req.body.uuid=req.params.uuid;
        await groupService.updateGroup(req.body);
        return res.json({'success':'update'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Update group failed', 200));
    }
};

