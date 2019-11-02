import di from 'typedi';

export default class ModuleInterface
{
    async init()
    {
        throw(this.constructor.name + ": Method init() not implemented");
    }

    async routes()
    {
        throw(this.constructor.name + ":Method routes not implemented");
    }

    async roles(acl)
    {
        try
        {
            const aclService = di.Container.get('aclService');
            aclService.append(acl);
        }
        catch(e)
        {
            const logger = di.Container.get('logger');
            logger.error("AclService unavailable");
        }
    }
}