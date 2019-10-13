import di from 'typedi';
import jwt from 'jsonwebtoken';

export default class AuthService {

    constructor()
    {
        this.logger = di.Container.get('logger');
        this.config = di.Container.get('config');
        this.userService = di.Container.get('userService');
    }

    async login(username, password)
    {
        try {
            const user = await this.userService.getUserByName(username);
            if(user !== undefined && user.status === 'active' && await this._checkPassword(password,user.password,user.salt))
            {
                await this.userService.updateLoginTime(user);
                this.logger.info("Login: %s",user.username);
                return await this._generateToken(user);
            }
        }
        catch(e)
        {
            this.logger.error("Login Failed: %s %s",username,e);
        }
    }

    async _checkPassword(password,hash,salt)
    {
        if(await this.userService.generatePassHash(password,salt) === hash)
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