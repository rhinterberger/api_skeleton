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

    async roles()
    {
        // TODO: Load acl.json and append to global acl
    }
}