import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        await authService.beginPwReset(req.body.uuid);
        return res.json({'beginresetpass': 'successful'}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'ResetPassword failed', 200));
    }
};
