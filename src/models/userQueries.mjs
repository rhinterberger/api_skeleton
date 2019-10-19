import di from 'typedi';

export default class userQueries
{
    constructor(database)
    {
        this.db=database;
        this.queries=di.Container.get('queries');
    }

    async queryCreateUser(user)
    {
        await this.db.query(this.queries.userCreate,[user.username, user.password, user.salt, user.status, user.role]);
    }


    async queryAllUsers()
    {
        const res = await this.db.query(this.queries.userGetAll);
        return res.rows;
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



    // Todo: move to confirmationQueries
    async queryNewConfirmation(type, uuid, token)
    {
        await this.db.query(this.queries.newConfirmation,[type, uuid, token]);
    }

    // Todo: move to confirmationQueries
    async queryConfirm(type, token, expire)
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

        await this.db.query(this.queries.deleteConfirmation, [type, token]);
    }
};