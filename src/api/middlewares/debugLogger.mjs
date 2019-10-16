import di from 'typedi';

export default async (req, res, next) =>
{
    const logger = di.Container.get('logger');
    logger.debug('Calling %s%s endpoint with body: %o querystring: %o', req.baseUrl, req.path, req.body, req.query);
    return next();
}