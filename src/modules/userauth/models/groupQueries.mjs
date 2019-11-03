import di from 'typedi';

export default class groupQueries
{
    constructor(database)
    {
        this.db=database;
        this.queries=di.Container.get('queries');
    }

    async queryCreateGroup(group)
    {
        await this.db.query(this.queries.groupCreate,[group.name, group.roles]);
    }

    async queryAllGroups()
    {
        const res = await this.db.query(this.queries.groupGetAll);
        return res.rows;
    }

    async queryGroupByName(groupName)
    {
        const res = await this.db.query(this.queries.groupGetByName,[groupName]);
        return res.rows;
    }

    async queryGroupById(gid)
    {
        const res = await this.db.query(this.queries.groupGetById,[gid]);
        return res.rows;
    }

    async queryUpdateGroup(group)
    {
        const res=await this.db.query(this.queries.groupUpdate,[group.name, group.roles, group.uuid]);;
        return res.rowCount;
    }

    async queryDeleteGroup(gid)
    {
        const res=await this.db.query(this.queries.groupDelete,[gid]);;
        return res.rowCount;
    }

    async queryGetUserGroups(uuid)
    {
        const res=await this.db.query(this.queries.groupByUser,[uuid]);
        return res.rows;
    }
};