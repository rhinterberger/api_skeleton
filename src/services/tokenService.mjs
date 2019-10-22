import jwt from 'jsonwebtoken';
import di from "typedi";
import ConfirmationService from "./confirmationService.mjs";

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
            'user': user.uuid,
            'role': user.role,
        }, this.config.token.secret, { expiresIn: this.config.token.expire });
    }

    async generatePasswordToken(user)
    {
        const confirmationToken = await this.confirmationService.generateConfirmationToken('dopassreset', user);

        return jwt.sign({
            'user': user.uuid,
            'confirmation': confirmationToken,
        }, this.config.token.secret, { expiresIn: this.config.token.expire });
    }
};