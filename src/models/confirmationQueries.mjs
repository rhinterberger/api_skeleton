import di from 'typedi';

export default class userQueries
{
    constructor(database)
    {
        this.db=database;
        this.queries=di.Container.get('queries');
    }

    async queryNewConfirmation(type, uuid, token)
    {
        await this.db.query(this.queries.newConfirmation,[type, uuid, token]);
    }

    async queryConfirm(type, token, expire)
    {
        const res = await this.db.query(this.queries.confirmConfirmation, [type, token, expire]);
        if (res.rowCount === 0)
            throw("Token invalid");

        await this.db.query(this.queries.deleteConfirmation, [type, token]);
        return res.rows[0].useruuid;
    }
};