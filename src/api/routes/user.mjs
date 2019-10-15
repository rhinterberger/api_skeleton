import Router from 'express-promise-router';
import di from 'typedi';

export default async () => {

    const route = Router();
    const logger = di.Container.get('logger');
    const userService = di.Container.get('userService');

    route.post('/register',
        async (req, res, next) => {

            logger.debug('Calling /user/register endpoint with body: %o', req.body);

            let uuid;

            try {
                const {username, password } = req.body;
                uuid = await userService.register(username,password);
            } catch (e) {
                logger.error('🔥 error: %o',  e );
                return next(e);
            }
            if(uuid)
                return res.json({'uuid':uuid}).status(200);

            else
            {
                var err = new Error('Register Failed');
                err['status'] = 401;
                return next(err);
            }

        }
    );

    route.get('/confirmregister',
        async (req, res, next) => {
            logger.debug('Calling /user/confirmregister endpoint with query-string: %o', req.query);

            try {
                await userService.confirmRegister(req.query.token);
            } catch (e) {
                var err = new Error(e);
                err['status'] = 401;
                return next(err);
            }

            return res.json({'confirmation': 'successful'}).status(200);
        }
    );

    route.post('/resetpass',
        async (req, res, next) => {
            logger.debug('Calling /user/resetpass endpoint with body: %o', req.body);

            const { uuid } = req.body;

            try {
                await userService.beginPwReset(uuid);
                return res.json({'uuid':uuid}).status(200);
            } catch (e) {
                logger.error('🔥 error: %o',  e );

                var err = new Error('ResetPassword Failed');
                err['status'] = 401;
                return next(err);
            }
        }
    );

    route.get('/confirmresetpass',
        async (req, res, next) => {
            logger.debug('Calling /user/confirmresetpass endpoint with query: %o', req.query);

            try {
                await userService.confirmPwReset(req.query.token);
            } catch (e) {
                var err = new Error(e);
                err['status'] = 401;
                return next(err);
            }

            return res.json({'confirmation': 'successful'}).status(200);
        }
    );

    return route;
};