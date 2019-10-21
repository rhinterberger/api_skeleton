import di from 'typedi';
import confirmationService from "./confirmationService.mjs";

export default class RegistrationService {

    constructor()
    {
        this.logger=di.Container.get('logger');
        this.userService = di.Container.get('userService');
    }

    async register(username, password)
    {
        const user = await this.userService.createUser({'username': username, 'password': password});

        if(user) {
            new confirmationService().sendOptIn(user);
            this.logger.info("User Created: " + user.uuid);
            return user.uuid;
        }
    }

    async confirmRegister(token)
    {
        const uuid = await new confirmationService().confirm(token, 'register');
        const user = await this.userService.getUserByUuid(uuid);
        delete user.password;   // updateUser will fail if password property is set

        user.status = 'active';
        await this.userService.updateUser(user);
    }
};