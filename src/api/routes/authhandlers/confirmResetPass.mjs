import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        const token = await authService.confirmPwReset(req.query.token);
        return res.json({'jwt': token}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Confirm ResetPass failed', 401));
    }
};