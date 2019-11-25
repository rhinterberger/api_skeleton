import jwt from "jsonwebtoken";
import di from 'typedi';
import generateError from "../../../../util/generateError.mjs";

export default async (req, res, next) => {

    function getToken()
    {
        if(req.headers && req.headers.authorization)
        {
            let parts = req.headers.authorization.split(' ');
            if(parts.length===2 && parts[0]==='Bearer')
                return parts[1];
        }
        throw("Token not found");
    }

    async function checkAcl()
    {
        const aclService = di.Container.get('aclService');
        if(await aclService.checkAcl(req.method, req.baseUrl + req.route.path, req.user))
            return true;

        throw("Access Denied");
    }

    const config = di.Container.get('config');
    try
    {
        req.user = jwt.verify(getToken(),config.token.privkey, {algorithm: congfig.token.algorithm});
        if(await checkAcl()) next();
    }
    catch(e)
    {
        return next(await generateError(e,'Access Denied', 401));
    }
};