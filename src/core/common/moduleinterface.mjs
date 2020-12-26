import Services from '../../core/common/serviceRegistry.mjs'

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
            const aclService = Services.get('aclService');
            aclService.append(acl);
        }
        catch(e)
        {
            const logger = Services.get('logger');
            logger.error("AclService unavailable");
        }
    }
}