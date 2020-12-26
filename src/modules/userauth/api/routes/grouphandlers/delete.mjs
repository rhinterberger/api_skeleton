import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        await groupService.deleteGroup(req.params.uuid);
        return res.json({'success':'delete'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Delete group failed', 200));
    }
};

