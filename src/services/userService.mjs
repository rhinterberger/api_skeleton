import crypto from 'crypto';
import di from 'typedi';
import UserModel from '../models/userModel.mjs';
import confirmationService from "./confirmationService.mjs";

export default class UserService {

    constructor()
    {
        this.Logger=di.Container.get('logger');
        this.eventEmitter = di.Container.get('events');
        this.User = new UserModel(di.Container.get("database"), di.Container.get("config"));
    }

    // Todo: move to registrationService
    async register(username, password)
    {
        const user = await this.createUser({'username': username, 'password': password});

        if(user) {
            new confirmationService().sendOptIn(user);
            this.Logger.info("User Created: " + user.uuid);
            return user.uuid;
        }
    }

    // Todo: move to registrationService
    async confirmRegister(token)
    {   // TODO: move to confirmationService / Model
        await this.User.confirm(token,'register');
    }


    // Todo: move to confirmationService
    async generateConfirmationToken(type, uuid)
    {
        const token=crypto.randomBytes(24).toString('hex');
        try{
            // TODO: move to confirmationModel
            await this.User.newConfirmation(type,uuid,token);
        }

        catch(e)
        {
            this.Logger.error("Create confirmations Failed : %s",e);
        }
        return token;
    }

    async createUser(user)
    {
        const AuthService = di.Container.get("authService");
        const {passHash, salt} = await AuthService.generatePassHashSalted(user.password);

        const userdata = {
            "username": user.username,
            "password": passHash,
            "salt": salt,
            "role": user.role || 4,
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

        return await this.User.update(user);
    }

    async deleteUser(uuid)
    {
        if(uuid.length!==36)
            throw("invalid UUID");

        await this.User.delete(uuid);
    }
};