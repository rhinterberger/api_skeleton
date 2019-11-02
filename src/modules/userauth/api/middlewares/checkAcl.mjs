import di from 'typedi';

export default async (req, res, next) =>
{
    const aclService = di.Container.get('aclService');
    if(await aclService.checkAcl(req.method, req.baseUrl + req.route.path, req.user))
        return next();

    return res.json({'access': 'denied'}).status(401);
};


