export default class dbService
{
    constructor(database, queries)
    {
        this.db=database;
        this.queries=queries;
    }

    async queryUserByName(username)
    {
        const res = await this.db.query(this.queries.userGetByName,[username]);
        return res.rows;
    }

    async queryUserByUuid(uuid)
    {
        const res = await this.db.query(this.queries.userGetByUuid,[uuid]);
        return res.rows;
    }

    async queryUpdateLoginTime(uid)
    {
        await this.db.query(this.queries.userUpdateLoginTime,[uid]);
    }

    async queryCreateUser(user)
    {
        await this.db.query(this.queries.userCreate,[user.username, user.password, user.salt]);
    }

    async querySetStatus(uid,status)
    {
        await this.db.query(this.queries.userSetStatus,[uid,status]);
    }

    async querySetRole(uid,role)
    {
        await this.db.query(this.queries.userSetRole,[uid,status]);
    }

    async queryNewConfirmation(type, uuid, token)
    {
        await this.db.query(this.queries.newConfirmation,[type, uuid, token]);
    }

    async queryConfirm(type,token,expire)
    {
        let res;
        switch (type)
        {
            case 'register':
                res = await this.db.query(this.queries.userConfirmRegister, [expire, token]);
                break;
            case 'resetpass':
                res = await this.db.query(this.queries.userConfirmResetPass, [expire, token]);
                break;
            default:
                throw("No type für confirmation token given");
        }

        if (res.rowCount === 0)
            throw("Token invalid");

        return true;
    }

    // TODO: remove me - just proxy method for refactor
    async query(query, params = []) {
        return this.db.query(query, params);
    }
};