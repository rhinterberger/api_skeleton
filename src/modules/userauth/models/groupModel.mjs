import Queries from './groupQueries.mjs';

export default class GroupModel {

    constructor(database, config) {
        this.db = new Queries(database);
        this.config = config;
    }

    async create(group) {
        await this.db.queryCreateGroup(group);
        return this.getGroupByName(user.username);
    }

    async getAll() {
        const rows = await this.db.queryAllGroups();
        if (rows.length === 0)
            throw "List all groups failed";
        return rows;
    }

    async getGroupByName(groupname) {
        const rows = await this.db.queryGroupByName(groupname);
        if (rows.length === 0)
            throw "Group by Name not Found";
        return rows[0];
    }

    async getGroupById(uuid) {
        const rows = await this.db.queryGroupById(uuid);
        if (rows.length === 0)
            throw "Group by UUID not Found";
        return rows[0];
    }

    async getUserGroup(uuid) {
        const rows = await this.db.queryGetUserGroups(uuid);
        if (rows.length === 0)
            throw "UserGroup by UUID not Found";
        return rows;
    }

    async updateGroup(group) {
        const rowCount = await this.db.queryUpdateGroup(group);
        if (rowCount === 0)
            throw "Update UUID not Found";
    }

    async delete(uuid) {
        const rowCount = await this.db.queryDeleteGroup(uuid);
        if (rowCount === 0)
            throw "Delete UUID not Found";
    }
};