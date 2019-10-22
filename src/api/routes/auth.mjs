import Router from 'express-promise-router';
import handlers from './authhandlers/index.mjs';

export default async () => {
    const route = Router();

    route.post('/login',handlers.login);
    route.post('/initresetpass', await handlers.initResetPass);
    route.get('/confirmresetpass', await handlers.confirmResetPass);

    return route;
};