import crypto from 'crypto';
import di from 'typedi';
import ConfirmationModel from '../models/confirmationModel.mjs';

export default class ConfirmationService {

    constructor()
    {
        this.logger=di.Container.get('logger');
        this.eventEmitter = di.Container.get('events');
        this.confirmationModel = new ConfirmationModel(di.Container.get("database"), di.Container.get("config"));
    }

    async sendPasswordReset(user)
    {
        this.eventEmitter.emit("sendPasswordReset", user.username, await this._generateConfirmationToken('resetpass',user));
    }

    async sendOptIn(user)
    {
        this.eventEmitter.emit("sendOptIn", user.username, await this._generateConfirmationToken('register',user));
    }

    async confirm(token, type)
    {
        return await this.confirmationModel.confirm(token,type);
    }

    async _generateConfirmationToken(type, user)
    {
        try{
            return await this.confirmationModel.create(type,user);
        }
        catch(e)
        {
            this.logger.error("Create confirmation Failed : %s",e);
        }
    }
};