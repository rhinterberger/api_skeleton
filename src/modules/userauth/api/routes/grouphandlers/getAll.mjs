import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        const groups = await groupService.getAllGroups();
        return res.json({'groups':groups}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List all groups failed', 200));
    }
};

