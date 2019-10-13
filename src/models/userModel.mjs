export default class UserModel {

    constructor(database, config)
    {
        this.db = database;
        this.config = config;
    }

    async getUserByName(username)
    {
        const rows = await this.db.queryUserByName(username);
        if(rows.length === 0)
            throw "User by Name not Found";
        return rows[0];
    }

    async getUserByUuid(uuid)
    {
        const rows = await this.db.queryUserByUuid(uuid);
        if(rows.length === 0)
            throw "User by UUID not Found";
        return rows[0];
    }

    async updateLoginTime(uid)
    {
        await this.db.queryUpdateLoginTime(uid);
    }

    async create(user)
    {
        await this.db.queryCreateUser(user);
        return this.getUserByName(user.username);
    }

    async setStatus(uid, status)
    {
        await this.db.querySetStatus(uid,status);
    }

    async setRole(uid, role)
    {
        await this.db.querySetRole(uid,role);
    }

    async newConfirmation(type, uuid, token)
    {
        await this.db.queryNewConfirmation(type, uuid, token);
    }

    async confirm(token, type)
    {
        await this.db.queryConfirm(type, token, this.config.activationexpire);
    }

};