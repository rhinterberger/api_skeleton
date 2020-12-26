import Router from 'express-promise-router';
import Services from '../../core/common/serviceRegistry.mjs'
import moment from "moment";
import ModuleInterface from "../../core/common/moduleinterface.mjs";

export default class TestModule extends ModuleInterface
{
    async init()
    {
        this.db=Services.get('database');
        this.logger = Services.get('logger');
        this.logger.info("Init Module TestModule complete");
        const m = new moment();
    }

    async routes()
    {
        const router = Router();

        this.logger.info("Init Routes TestModule complete");
        return router;
    }

    async roles()
    {
        super.roles(await import("./acl.json"));
    }
}