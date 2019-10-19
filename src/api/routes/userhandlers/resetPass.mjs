import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        await userService.beginPwReset(req.body);
        return res.json({'uuid': req.body}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'ResetPassword failed', 200));
    }
};
