import Router from 'express-promise-router';
import di from 'typedi';

export default async () => {
    const logger = di.Container.get('logger');
    const authService = di.Container.get('authService');

    const route = Router();

    route.post('/login',
        async (req, res, next) => {
            logger.debug('Calling /auth/login endpoint with body: %o', req.body);

            try {
                const {username, password } = req.body;
                const token = await authService.login(username, password);
                if(token)
                    return res.json(token).status(200);
                else
                {
                    const err = new Error('Unauthorized');
                    err['status'] = 401;
                    return next(err);
                }
            } catch (e) {
                logger.error('🔥 error: %o',  e );
                return next(e);
            }
        }
    );

    return route;
};