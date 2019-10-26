import Router from 'express-promise-router';
import di from "typedi";
import handlers from './userhandlers/index.mjs';


export default async () => {
    const route = Router();

    const middleware = di.Container.get("middleware");
    route.post('/register', await handlers.register);
    route.get('/confirmregister', await handlers.confirmRegister);

    route.get('/', middleware.userAuth.isAuth, await handlers.getAll);
    route.post('/', middleware.userAuth.isAuth, await handlers.create);

    route.get('/:uuid', middleware.userAuth.isAuth, await handlers.readUser);
    route.put('/:uuid', middleware.userAuth.isAuth, await handlers.updateUser);
    route.delete('/:uuid', middleware.userAuth.isAuth, await handlers.deleteUser);

    return route;
};