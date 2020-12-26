import Router from 'express-promise-router';
import ModuleInterface from "../../core/common/moduleinterface.mjs";
import Services from "../../core/common/serviceRegistry.mjs";

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
        this.logger = Services.get('logger');

        // Add Dependencies to global DI
        Services.register('queries', await queryLoader());
        Services.register('events',new Subscribers());
        Services.register('userService',new UserService());
        Services.register('authService',new AuthService());
        Services.register('aclService', new AclService());
        Services.register('groupService', new GroupService());
        this.logger.info("Init Module UserAuthModule complete");
    }

    async routes(options)
    {
        const router = Router(options);

        console.log(options);
        let middleware = Services.get('middleware');
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
        await super.roles(await import("./acl.json"));
    }
}