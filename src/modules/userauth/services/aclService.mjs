import di from "typedi";

export default class AclService
{
    constructor()
    {
        this.acls = {};
        this.logger = di.Container.get('logger');
        this.config = di.Container.get('config');
        this.userService = di.Container.get('userService');
    }

    async append(acl)
    {
        acl.default.forEach((role) => {
            role.method.forEach((method) => {
                if( !this.acls[method]) this.acls[method] = [];
                this.acls[method][this.config.api.prefix + role.path] = role.role;
            })
        });
    }

    async checkAcl(method, path, user)
    {
        return user.roles.indexOf(this.acls[method][path]) !== -1;
    }

    async availableRoles()
    {
        let roles = [];
        for(let method in this.acls)
            for (let path in this.acls[method])
                if(roles.indexOf(this.acls[method][path]) === -1)
                    roles.push(this.acls[method][path]);

        return roles;
    }
}