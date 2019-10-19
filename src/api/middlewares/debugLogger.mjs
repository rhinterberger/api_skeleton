import di from 'typedi';

export default async (req, res, next) =>
{
    const logger = di.Container.get('logger');
    logger.debug('%s %s%s endpoint with body: %o querystring: %o',req.method, req.baseUrl, req.path, req.body, req.query);
    return next();
}