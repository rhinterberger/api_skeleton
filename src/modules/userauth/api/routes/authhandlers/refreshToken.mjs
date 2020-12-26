import di from 'typedi';
import generateError from '../../../../../core/common/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        const token = await authService.refreshToken(req.user.uuid);
        return res.json({'jwt': token}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'RefreshToken failed', 401));
    }
};

