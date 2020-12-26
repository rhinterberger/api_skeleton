import Services from '../../../core/common/serviceRegistry.mjs'

export default class userQueries
{
    constructor(database)
    {
        this.db=database;
        this.queries=Services.get('queries');
    }

    async queryNewConfirmation(type, uuid, token)
    {
        await this.db.query(this.queries.newConfirmation,[type, uuid, token]);
    }

    async queryIsValid(type, token, expire)
    {
        const res = await this.db.query(this.queries.confirmationIsValid,[type, token, expire]);
        if (res.rowCount === 0)
            throw("Token invalid");

        return res;
    }

    async queryConfirm(type, token, expire)
    {
       const res = await this.queryIsValid(type, token, expire);
       await this.db.query(this.queries.deleteConfirmation, [type, token]);
       return res.rows[0].useruuid;

    }
};