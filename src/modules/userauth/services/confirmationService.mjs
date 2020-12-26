import Services from '../../../core/common/serviceRegistry.mjs'
import ConfirmationModel from '../models/confirmationModel.mjs';

export default class ConfirmationService {

    constructor()
    {
        this.logger=Services.get('logger');
        this.eventEmitter = Services.get('events');
        this.confirmationModel = new ConfirmationModel(Services.get("database"), Services.get("config"));
    }

    async sendPasswordReset(user)
    {
        this.eventEmitter.emit("sendPasswordReset", user.username, await this.generateConfirmationToken('resetpass',user));
    }

    async sendOptIn(user)
    {
        this.eventEmitter.emit("sendOptIn", user.username, await this.generateConfirmationToken('register',user));
    }

    async isValid(token, type)
    {
        try {
            return await this.confirmationModel.isValid(token, type);
        }
        catch(e)
        {
            this.logger.error("Validate confirmation Failed : %s",e);
        }
    }

    async confirm(token, type)
    {
        try {
            return await this.confirmationModel.confirm(token, type);
        }
        catch(e)
        {
            this.logger.error("Confirm confirmation Failed : %s",e);
        }
    }

    async generateConfirmationToken(type, user)
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