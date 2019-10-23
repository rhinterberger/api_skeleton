import Router from 'express-promise-router';
import handlers from './authhandlers/index.mjs';
import middlewares from '../middlewares/index.mjs';

export default async () => {
    const route = Router();

    route.post('/login',handlers.login);
    route.post('/initresetpass',  handlers.initResetPass);
    route.get('/confirmresetpass', handlers.confirmResetPass);
    route.post('/executeresetpass', middlewares.isAuth, middlewares.isPasswordReset, handlers.executeResetPass);
    route.post('/refreshtoken', middlewares.isAuth, handlers.refreshToken);

    return route;
};