import Router from 'express-promise-router';
import middleware from '../middlewares/index.mjs';
import handlers from './userhandlers/index.mjs';

export default async () => {
    const route = Router();

    route.post('/register', await handlers.register);
    route.get('/confirmregister', await handlers.confirmRegister);

    route.get('/', middleware.isAuth, await handlers.getAll);
    route.post('/', middleware.isAuth, await handlers.create);

    route.get('/:uuid', middleware.isAuth, await handlers.readUser);
    route.put('/:uuid', middleware.isAuth, await handlers.updateUser);
    route.delete('/:uuid', middleware.isAuth, await handlers.deleteUser);

    return route;
};