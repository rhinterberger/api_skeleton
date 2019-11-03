import Router from 'express-promise-router';
import di from 'typedi';
import ModuleInterface from "../moduleinterface.mjs";

import queryLoader from "./loaders/sqlqueryloader.mjs";
import Subscribers from "./subscribers/index.mjs";
import authRoutes from './api/routes/auth.mjs';
import userRoutes from './api/routes/user.mjs';
import groupRoutes from './api/routes/group.mjs';
import middlewares from './api/middlewares/index.mjs';
import UserService from "./services/userService.mjs";
import AuthService from "./services/authService.mjs";
import AclService from "./services/aclService.mjs";
import GroupService from "./services/groupService.mjs";

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
        di.Container.set('aclService', new AclService());
        di.Container.set('groupService', new GroupService());
        this.logger.info("Init Module UserAuthModule complete");
    }

    async routes(options)
    {
        const router = Router(options);

        console.log(options);
        let middleware = di.Container.get('middleware');
        middleware.auth = middlewares;
        router.use('/auth', await authRoutes(options));
        router.use('/user', await userRoutes(options));
        router.use('/group', await groupRoutes(options));

        this.logger.info("Init Routes UserAuthModule complete");
        return router;
    }

    async roles()
    {
        // Cant get correct path in superclass directly.
        // Don't like it this way ...
        super.roles(await import("./acl.json"));
    }
}