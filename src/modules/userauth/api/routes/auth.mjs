import Router from 'express-promise-router';
import di from "typedi";
import handlers from './authhandlers/index.mjs';

export default async () => {
    const route = Router();
    const middleware = di.Container.get("middleware");

    route.post('/login',handlers.login);
    route.post('/initresetpass',  handlers.initResetPass);
    route.get('/confirmresetpass', handlers.confirmResetPass);
    route.post('/executeresetpass', middleware.userAuth.isAuth, middleware.userAuth.isPasswordReset, handlers.executeResetPass);
    route.post('/refreshtoken', middleware.userAuth.isAuth, handlers.refreshToken);

    return route;
};