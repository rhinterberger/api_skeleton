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
            let module = await import('../'+apiModule.importpath);
            let moduleInstance = new module.default();
            await moduleInstance.init();
            await moduleInstance.roles();

            this.modules.push({apipath: apiModule.apipath, module: moduleInstance});
        }
    }

    async routes()
    {
        const router = Router();

        for(let apiModule of this.modules)
        {
            router.use(apiModule.apipath, await apiModule.module.routes());
        }
        return router;
    }
}