import Router from 'express-promise-router';
import di from 'typedi';
import ModuleInterface from "../moduleinterface.mjs";

import authRoutes from './api/routes/auth.mjs';
import userRoutes from './api/routes/user.mjs';
import middlewares from './api/middlewares/index.mjs';
import UserService from "./services/userService.mjs";
import AuthService from "./services/authService.mjs";
import queryLoader from "./loaders/sqlqueryloader.mjs";
import Subscribers from "./subscribers/index.mjs";

export default class UserAuthModule extends ModuleInterface
{
    async init()
    {
        this.logger = di.Container.get('logger');

        // Add Dependencies to global DI
        di.Container.set('queries', await queryLoader());
        di.Container.set('events',new Subscribers());
        di.Container.set('userService',new UserService());
        di.Container.set('authService',new AuthService());
        this.logger.info("Init Module UserAuthModule complete");
    }

    async routes()
    {
        const router = Router();

        let middleware = di.Container.get('middleware');
        middleware.userAuth = middlewares;
        router.use('/auth', await authRoutes());
        router.use('/user', await userRoutes());

        this.logger.info("Init Routes UserAuthModule complete");
        return router;
    }
}