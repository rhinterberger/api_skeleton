import di from 'typedi';
import Config from '../config/index.mjs';
import Logger from './loggerLoader.mjs';
import AuthService from '../services/authService.mjs';
import UserService from '../services/userService.mjs';
import Subscribers from "../subscribers/index.mjs";
import queryLoader from "./sqlqueryloader.mjs";

export default async (db) => {
    try {
        di.Container.set('config',Config);
        di.Container.set('database',db);
        di.Container.set('logger',Logger);
        di.Container.set('queries', await queryLoader());
        di.Container.set('events',new Subscribers());

        di.Container.set('userService',new UserService());
        di.Container.set('authService',new AuthService());
        Logger.debug('Done Dependecy Injection');
    }
    catch (e) {
        Logger.error('🔥 Error dependency injector loader: %o', e);
        throw e;
    }
};