import mail from 'nodemailer';
import di from "typedi";
import fs from "fs";
import mustache from "mustache";

export default class EmailService
{
    constructor()
    {
        this.logger=di.Container.get('logger');
        this.config = di.Container.get('config');
    }

    async sendOptInMail(to, token)
    {
        try {
            const substitutions = {
                token: token,
                baseUrl: this.config.baseURL,
                path: this.config.api.prefix + '/user/confirmregister',
            };

            const messagePlain = await this._loadTemplate('optin.txt', substitutions);
            const messageHtml = await this._loadTemplate('optin.html', substitutions);

            const message = await this._composeMail(to,this.config.optin.subject, messagePlain, messageHtml);
            this._sendmail(message);
        }
        catch(e)
        {
            this.logger.error("Sending Optin Mail Failed: %o", e);
        }
    }

    async sendPasswordResetMail(to, token)
    {
        try {
            const substitutions = {
                token: token,
                baseUrl: this.config.baseURL,
                path: this.config.api.prefix + '/auth/confirmresetpass',
            };

            const messagePlain = await this._loadTemplate('resetpassword.txt', substitutions);
            const messageHtml = await this._loadTemplate('resetpassword.html', substitutions);

            const message = await this._composeMail(to, this.config.optin.subject, messagePlain, messageHtml);
            this._sendmail(message);
        }
        catch(e)
        {
            this.logger.error("Sending Passwordreset Mail Failed: %o", e);
        }
    }

    async _loadTemplate(filename, substitutions)
    {
        const data = fs.readFileSync('./src/modules/userauth/templates/' + filename);
        return mustache.render(data.toString('utf8'), substitutions)
    }

    async _composeMail(to, subject, messagePlain, messageHtml)
    {
        return {
            from: this.config.optin.from,
            to: to,
            subject: subject,
            text: messagePlain,
            html: messageHtml
        };
    }

    async _sendmail(message)
    {
        try {
            const smtp = mail.createTransport(this.config.smtpURL);
            await smtp.sendMail(message);
        }
        catch(e)
        {
            this.logger.error("Sending Optin Mail Failed: %o", e);
        }
    }
}