import jwt from "express-jwt";
import di from 'typedi';

export default async (req, res, next) => {
    const config = di.Container.get('config');
    jwt({ secret: config.token.secret })(req, res, next);
};