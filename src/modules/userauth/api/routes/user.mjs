import Router from 'express-promise-router';
import di from "typedi";
import handlers from './userhandlers/index.mjs';

export default async () => {
    const route = Router();

    const mw = di.Container.get("middleware");
    route.post('/register', await handlers.register);
    route.get('/confirmregister', await handlers.confirmRegister);

    route.get('/', await mw.auth.isAuth, await mw.auth.checkAcl, await handlers.getAll);
    route.post('/', await mw.auth.isAuth, await handlers.create);

    route.get('/:uuid', await mw.auth.isAuth, await mw.auth.checkAcl, await handlers.readUser);
    route.put('/:uuid', await mw.auth.isAuth, await handlers.updateUser);
    route.delete('/:uuid', await mw.auth.isAuth, await handlers.deleteUser);

    return route;
};