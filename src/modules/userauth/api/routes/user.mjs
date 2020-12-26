import Router from 'express-promise-router';
import Services from '../../../../core/common/serviceRegistry.mjs'
import handlers from './userhandlers/index.mjs';

export default async (options) => {
    const route = Router(options);

    const mw = Services.get("middleware");
    route.post('/register', await handlers.register);
    route.get('/confirmregister', await handlers.confirmRegister);

    route.get('/:uuid', await mw.auth.isAuth, await handlers.readUser);
    route.post('/:uuid', await mw.auth.isAuth, await handlers.updateUser);
    route.delete('/:uuid', await mw.auth.isAuth, await handlers.deleteUser);

    route.get('/', await mw.auth.isAuth, await handlers.getAll);
    route.post('/', await mw.auth.isAuth, await handlers.create);

    return route;
};