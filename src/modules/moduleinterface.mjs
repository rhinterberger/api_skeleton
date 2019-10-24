export default class ModuleInterface
{
    async init()
    {
        throw("Method init() not implemented");
    }

    async routes()
    {
        throw("Method routes not implemented");
    }

    async roles()
    {
        // TODO: Load acl.json and append to global acl
    }
}