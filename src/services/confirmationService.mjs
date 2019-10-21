import crypto from 'crypto';
import di from 'typedi';
import UserModel from '../models/userModel.mjs';

export default class ConfirmationService {

    constructor()
    {
        this.Logger=di.Container.get('logger');
        this.eventEmitter = di.Container.get('events');
        this.User = new UserModel(di.Container.get("database"), di.Container.get("config"));
    }

    async sendPasswordReset(user)
    {
        this.eventEmitter.emit("sendPasswordReset", user.username, await this._generateConfirmationToken('resetpass',user.uuid));
    }

    async sendOptIn(user)
    {
        this.eventEmitter.emit("sendOptIn", user.username, await this._generateConfirmationToken('register',user.uuid));
    }

    async _generateConfirmationToken(type, uuid)
    {
        // TODO: move to confirmation Model
        const token=crypto.randomBytes(24).toString('hex');

        try{
            // TODO: move to confirmation Model
            await this.User.newConfirmation(type,uuid,token);
        }
        catch(e)
        {
            this.Logger.error("Create confirmations Failed : %s",e);
        }
        return token;
    }
};