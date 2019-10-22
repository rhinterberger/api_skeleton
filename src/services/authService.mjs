import di from 'typedi';
import crypto from "crypto";
import ConfirmationService from "./confirmationService.mjs";
import TokenService from "./tokenService.mjs";

export default class AuthService {

    constructor()
    {
        this.logger = di.Container.get('logger');
        this.config = di.Container.get('config');
        this.userService = di.Container.get('userService');
        this.confirmationService = new ConfirmationService();
        this.tokenService = new TokenService();
    }

    async login(username, password)
    {
        const user = await this.userService.getUserByName(username);
        if(user !== undefined && user.status === 'active' && await this._checkPassword(password,user))
        {
            await this.userService.updateLoginTime(user);
            this.logger.info("Login: %s",user.username);
            return await this.tokenService.generateLoginToken(user);
        }
        throw('Login failed');
    }

    async initResetPassword(uuid)
    {
        try
        {
            let user=await this.userService.getUserByUuid(uuid);
            await this.confirmationService.sendPasswordReset(user);

            this.logger.info("Passwordreset sent: " + user.uuid);

        }
        catch (e) {
            this.logger.info("Start Password-Reset failed: %o",e);
        }
    }

    async confirmPwReset(token)
    {
        const uuid = await this.confirmationService.confirm(token,'resetpass');
        const user = await this.userService.getUserByUuid(uuid);
        return await this.tokenService.generatePasswordToken(user);
    }

    async generatePassHashSalted(password)
    {
        // Always generate new salt when setting new password
        const salt = crypto.randomBytes(32).toString('hex');
        const passHash = await this._generatePassHash(password, salt);
        return { passHash: passHash, salt: salt };
    }

    async _generatePassHash(password, salt)
    {
        // Convert to async crypto.scrypt(..)
        return crypto.scryptSync(password, salt, 64).toString('hex');
    }

    async _checkPassword(password,user)
    {
        if(await this._generatePassHash(password,user.salt) === user.password)
            return true;

        throw "Password Mismatch";
    }
};