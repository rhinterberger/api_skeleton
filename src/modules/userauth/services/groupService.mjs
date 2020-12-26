import Services from '../../../core/common/serviceRegistry.mjs'
import GroupModel from '../models/groupModel.mjs';

export default class GroupService {

    constructor()
    {
        this.group = new GroupModel(Services.get("database"), Services.get("config"));
    }

    async createGroup(group)
    {
        return await this.group.create(group);
    }

    async getAllGroups()
    {
        return await this.group.getAll();
    }

    async getGroupByName(groupname)
    {
        return await this.group.getGroupByName(groupname);
    }

    async getGroupById(uuid)
    {
        return await this.group.getGroupById(uuid);
    }

    async getUserGroup(uuid)
    {
        return await this.group.getUserGroup(uuid);
    }

    async getAvailableRoles()
    {
        const aclService = di.Container.get('aclService');
        return await aclService.availableRoles();
    }

    async updateGroup(group)
    {
        if(group.uuid === undefined || group.name === undefined || group.roles === undefined)
            throw("Missing data");

        return await this.group.updateGroup(group);
    }

    async deleteGroup(uuid)
    {
        if(uuid.length!==36)
            throw("invalid UUID");

        await this.group.delete(uuid);
    }
};