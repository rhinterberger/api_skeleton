import EventEmitter from 'events';

import optInEvent from "./optin.mjs";
import resetPasswordEvent from "./resetpass.mjs";

export default class Subscribers extends EventEmitter {

    constructor()
    {
        super();
        this.on("sendOptIn", optInEvent);
        this.on("sendPasswordReset", resetPasswordEvent);
    }
}
