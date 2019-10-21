import di from 'typedi';
import jwt from 'jsonwebtoken';
import crypto from "crypto";
import confirmationService from "./confirmationService.mjs";

export default class AuthService {

    constructor()
    {
        this.logger = di.Container.get('logger');
        this.config = di.Container.get('config');
        this.userService = di.Container.get('userService');
    }

    async login(username, password)
    {
        const user = await this.userService.getUserByName(username);
        if(user !== undefined && user.status === 'active' && await this._checkPassword(password,user))
        {
            await this._updateLoginTime(user);
            this.logger.info("Login: %s",user.username);
            return await this._generateToken(user);
        }

        throw('Login failed');
    }

    async beginPwReset(uuid)
    {
        try
        {
            let user=await this.userService.getUserByUuid(uuid);

            new confirmationService().sendPasswordReset(user);
            this.logger.info("Passwordreset sent: " + user.uuid);

        }
        catch (e) {
            this.logger.info("Start Password-Reset failed: %o",e);
        }
    }

    async confirmPwReset(token)
    {
        // TODO: move to confirmationService / Model
        await this.User.confirm(token,'resetpass');
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
        return crypto.scryptSync(password, salt, 64).toString('hex');
    }

    async _updateLoginTime(user)
    {
        // Todo: Change to userService.updateUser()
        await this.User.updateLoginTime(user.id);
    }

    async _checkPassword(password,user)
    {
        if(await this._generatePassHash(password,user.salt) === user.password)
            return true;

        throw "Password Mismatch";
    }

    async _generateToken(user)
    {
        return jwt.sign({
            'user': user.uuid,
            'username': user.username,
            'role': user.role,
        }, this.config.token.secret, { expiresIn: this.config.token.expire });
    }
};