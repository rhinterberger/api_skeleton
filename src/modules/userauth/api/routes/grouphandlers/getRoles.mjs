import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const groupService = di.Container.get('groupService');

    try {
        const roles = await groupService.getAvailableRoles();
        return res.json({'roles':roles}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'List all roles failed', 200));
    }
};

