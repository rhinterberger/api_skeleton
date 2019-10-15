import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const logger = di.Container.get('logger');
    const userService = di.Container.get('userService');

    logger.debug('Calling /user/register endpoint with body: %o', req.body);

    try {
        const {username, password } = req.body;
        let uuid = await userService.register(username,password);

        return res.json({'uuid':uuid}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Register new user failed'));
    }
};

