import Router from 'express-promise-router';
import login from './authhandlers/login.mjs';

export default async () => {
    const route = Router();

    route.post('/login',login);
   // route.post('/changePass',handlers.setPassword);


    return route;
};