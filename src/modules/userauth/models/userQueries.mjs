import Services from '../../../core/common/serviceRegistry.mjs'

export default class userQueries
{
    constructor(database)
    {
        this.db=database;
        this.queries=Services.get('queries');
    }

    async queryCreateUser(user)
    {
        await this.db.query(this.queries.userCreate,[user.username, user.password, user.salt, user.status]);
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

    async queryDeleteUser(uuid)
    {
        const res=await this.db.query(this.queries.userDelete,[uuid]);;
        return res.rowCount;
    }

    async queryUpdateUser(user)
    {
        const res=await this.db.query(this.queries.userUpdate,[user.username, user.status, user.role, user.uuid]);
        return res.rowCount;
    }

    async queryUpdateLoginTime(uid)
    {
        await this.db.query(this.queries.userUpdateLoginTime,[uid]);
    }

    async querySetPassword(user)
    {
        await this.db.query(this.queries.userSetPassword,[user.password, user.salt, user.uuid]);
    }

    async queryGetRoles(uuid)
    {
        const res = await this.db.query(this.queries.userGetRoles, [uuid]);
        return res.rows;
    }
};