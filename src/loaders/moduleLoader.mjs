import Router from 'express-promise-router';

export default class ModuleLoader
{
    constructor()
    {
        this.modules = [];
    }

    async init()
    {
        const modules = await import('../modules/modules.json');
        for (let apiModule of modules.default.enabledModules)
        {
           let moduleInstance = await this._initModule(apiModule);
            this.modules.push({apipath: apiModule.apipath, module: moduleInstance});
        }
    }

    async routes(options)
    {
        const router = Router(options);

        for(let apiModule of this.modules)
        {
            router.use(apiModule.apipath, await apiModule.module.routes(options));
        }
        return router;
    }

    async _initModule(apiModule)
    {
        let module = await import('../'+apiModule.importpath);
        let moduleInstance = new module.default();
        await moduleInstance.init();
        await moduleInstance.roles();

        return moduleInstance;
    }

}