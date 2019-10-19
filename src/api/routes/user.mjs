import Router from 'express-promise-router';
import middleware from '../middlewares/index.mjs';
import handlers from './userhandlers/index.mjs';

export default async () => {
    const route = Router();

    route.post('/register', await handlers.register);
    route.get('/confirmregister', await handlers.confirmRegister);

    route.post('/resetpass', await handlers.resetPass);
    route.get('/confirmresetpass', await handlers.confirmResetPass);

    route.get('/', middleware.isAuth, await handlers.getAll);
    route.get('/:uuid', middleware.isAuth, await handlers.readUser);

    return route;
};