import di from 'typedi';
import UserModel from '../models/userModel.mjs';

export default class UserService {

    constructor()
    {
        this.User = new UserModel(di.Container.get("database"), di.Container.get("config"));
    }

    async createUser(user)
    {
        // Todo: Add Validators for Password
        const AuthService = di.Container.get("authService");
        const { passHash, salt }  = await AuthService.generatePassHashSalted(user.password);

        const userdata = {
            "username": user.username,
            "password": passHash,
            "salt": salt,
            "role": user.role || 4,   // roles.getByName("user");
            "status": user.status || 'new',
        };

        return await this.User.create(userdata);
    }

    async getAllUsers()
    {
        return await this.User.getAll();
    }

    async getUserByName(username)
    {
        return await this.User.getUserByName(username);
    }

    async getUserByUuid(uuid)
    {
        return await this.User.getUserByUuid(uuid);
    }

    async updateUser(user)
    {
        if(user.password) throw("Change Password not possible");

        if(user.uuid === undefined || user.username === undefined || user.role === undefined || user.status === undefined)
            throw("Missing data");

        return await this.User.updateUser(user);
    }

    async updateLoginTime(user)
    {
        await this.User.updateLoginTime(user.id);
    }

    async setPassword(user)
    {
        if(user.uuid === undefined || user.password === undefined || user.salt === undefined) throw("Change Password failed");
        return await this.User.setPassword(user);
    }

    async deleteUser(uuid)
    {
        if(uuid.length!==36)
            throw("invalid UUID");

        await this.User.delete(uuid);
    }
};