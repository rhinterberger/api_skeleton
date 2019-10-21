import crypto from "crypto";
import Queries from './confirmationQueries.mjs';

export default class ConfirmationModel {

    constructor(database, config)
    {
        this.db = new Queries(database);
        this.config = config;
    }

    async create(type, user)
    {
        const token=crypto.randomBytes(24).toString('hex');
        await this.db.queryNewConfirmation(type, user.uuid, token);
        return token;
    }

    async confirm(token, type)
    {
        return await this.db.queryConfirm(type, token, this.config.token.activationexpire);
    }
};