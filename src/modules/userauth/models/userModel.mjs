import Queries from './userQueries.mjs';

export default class UserModel {

    constructor(database, config)
    {
        this.db = new Queries(database);
        this.config = config;
    }

    async create(user)
    {
        await this.db.queryCreateUser(user);
        return this.getUserByName(user.username);
    }

    async getAll()
    {
        const rows = await this.db.queryAllUsers();
        if(rows.length === 0)
            throw "List all users failed";
        return rows;
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

    async updateUser(user)
    {
        const rowCount=await this.db.queryUpdateUser(user);
        if(rowCount === 0)
            throw "Update UUID not Found";
    }

    async updateLoginTime(uid)
    {
        await this.db.queryUpdateLoginTime(uid);
    }

    async setPassword(user)
    {
        await this.db.querySetPassword(user);
    }

    async delete(uuid)
    {
        const rowCount=await this.db.queryDeleteUser(uuid);
        if(rowCount === 0)
            throw "Delete UUID not Found";
    }
};