import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        await authService.executeResetPassword(req.body.uuid, req.body.password, req.user.confirmation);
        return res.json({'executeResetPassword': 'successful'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'executeResetPassword failed', 401));
    }
};