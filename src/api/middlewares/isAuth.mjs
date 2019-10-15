import jwt from "express-jwt";
import di from 'typedi';

export default async () => {
    const config = di.Container.get('config');
    jwt({ config.token.secret});
};