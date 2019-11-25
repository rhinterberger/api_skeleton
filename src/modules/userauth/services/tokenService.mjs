import zlib from 'zlib';
import jwt from 'jsonwebtoken';
import di from "typedi";
import ConfirmationService from "./confirmationService.mjs";
import fs from "fs";

export default class TokenService
{
    constructor()
    {
        this.config = di.Container.get('config');
        this.confirmationService = new ConfirmationService();
    }

    async generateLoginToken(user)
    {
        return jwt.sign({
            'uuid': user.uuid,
            'roles': user.roles //zlib.gzipSync('' + user.roles).toString('base64'),
        }, this.config.token.privkey, { expiresIn: this.config.token.expire, algorithm: this.config.token.algorithm});
    }

    async generatePasswordToken(user)
    {
        const confirmationToken = await this.confirmationService.generateConfirmationToken('dopassreset', user);

        return jwt.sign({
            'uuid': user.uuid,
            'confirmation': confirmationToken,
        }, this.config.token.privkey, { expiresIn: this.config.token.expire, algorithm: this.config.token.algorithm});
    }
};