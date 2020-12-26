import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        await authService.initResetPassword(req.body.uuid);
        return res.json({'initResetPassword': 'successful'}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'ResetPassword failed', 200));
    }
};
