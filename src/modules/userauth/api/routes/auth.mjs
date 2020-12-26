import Router from 'express-promise-router';
import Services from '../../../../core/common/serviceRegistry.mjs'
import handlers from './authhandlers/index.mjs';

export default async (options) => {
    const route = Router(options);
    const mw = Services.get("middleware");

    route.get('/key', handlers.getKey);
    route.post('/login',handlers.login);
    route.post('/initresetpass',  handlers.initResetPass);
    route.get('/confirmresetpass', handlers.confirmResetPass);
    route.post('/executeresetpass', await mw.auth.isAuth, mw.auth.isPasswordReset, handlers.executeResetPass);
    route.post('/refreshtoken', await mw.auth.isAuth, handlers.refreshToken);

    return route;
};