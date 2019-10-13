import crypto from 'crypto';
import di from 'typedi';
import UserModel from '../models/userModel.mjs';

export default class UserService {

    constructor()
    {
        this.Logger=di.Container.get('logger');
        this.eventEmitter = di.Container.get('events');
        this.User = new UserModel(di.Container.get("database"), di.Container.get("config"));
    }

    async register(username, password)
    {
        try {
            const salt = await this.generateSalt();
            const passHash = await this.generatePassHash(password, salt);

            const userdata = {
                "username": username,
                "password": passHash,
                "salt": salt
            };

            try {
                 var user = await this.User.create(userdata);
            }
            catch(e)
            {
                this.Logger.error("Register Failed 1: %s",e);
            }

            if(user) {
                this.eventEmitter.emit("sendOptIn", user.username, await this.generateActivationToken('register',user.uuid));
                this.Logger.info("User Created: " + user.uuid);
                return user.uuid;
            }
        }
        catch(e)
        {
            this.Logger.error("Register Failed 2: %s",e);
        }
    }

    async confirmRegister(token)
    {
        await this.User.confirm(token,'register');
    }

    async getUserByName(username)
    {
        return await this.User.getUserByName(username);
    }

    async updateLoginTime(user)
    {
        await this.User.updateLoginTime(user.id);
    }

    async generatePassHash(password,salt)
    {
        return crypto.scryptSync(password, salt, 64).toString('hex');
    }

    async generateSalt()
    {
        return crypto.randomBytes(32).toString('hex');
    }

    async generateActivationToken(type,uuid)
    {
        const token=crypto.randomBytes(24).toString('base64');
        try{
            await this.User.newConfirmation(type,uuid,token);
        }
        catch(e)
        {
            this.Logger.error("Create confirmations Failed : %s",e);
        }
        return token;
    }
};