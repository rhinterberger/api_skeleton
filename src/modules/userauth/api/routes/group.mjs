import Router from 'express-promise-router';
import Services from '../../../../core/common/serviceRegistry.mjs'
import handlers from './grouphandlers/index.mjs';

export default async (options) => {
    const route = Router(options);

    const mw = Services.get("middleware");
    route.get('/roles', await mw.auth.isAuth, await handlers.getRoles);

    route.get('/user/:uuid', await mw.auth.isAuth, await handlers.getUserGroup);

    route.get('/:uuid', await mw.auth.isAuth, await handlers.readGroup);
    route.post('/:uuid', await mw.auth.isAuth, await handlers.updateGroup);
    route.delete('/:uuid', await mw.auth.isAuth, await handlers.deleteGroup);

    route.get('/', await mw.auth.isAuth, await handlers.getAll);
    route.post('/', await mw.auth.isAuth, await handlers.create);

// Get Usergroups

    return route;
};