import Router from 'express-promise-router';
import di from 'typedi';
import moment from "moment";

export default class TestModule
{
    constructor()
    {
        this.db=di.Container.get('database');
        this.logger = di.Container.get('logger');
        this.logger.info("Init Module TestModule complete");
        const m = new moment();
    }

    async routes()
    {
        const router = Router();

        this.logger.info("Init Routes TestModule complete");
        return router;
    }
}