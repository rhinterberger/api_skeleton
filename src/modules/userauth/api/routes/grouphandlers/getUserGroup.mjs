import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        const groups = await groupService.getUserGroup(req.params.uuid);
        return res.json({'group': groups}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List user groups failed', 200));
    }
};

