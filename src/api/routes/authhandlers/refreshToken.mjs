import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        const token = await authService.refreshToken(req.user.user);
        return res.json({'jwt': token}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'RefreshToken failed', 401));
    }
};

