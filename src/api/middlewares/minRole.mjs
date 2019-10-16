import di from 'typedi';
import generateError from '../../util/generateError.mjs';

export default async (options) =>
{
    const userService = di.Container.get('userService');

    try {
        if(await userService.minRole(req.user.role,minrole))
        {
            return next();
        }
    }
    catch (e)
    {
        return next(await generateError(e,'Privileges not met'));
    }
};