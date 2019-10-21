import di from "typedi";
import EmailService from "../services/emailService.mjs";

export default async (email, token) =>
{
    const logger = di.Container.get('logger');
    const emailService = new EmailService();
    await emailService.sendPasswordResetMail(email, token);

    logger.info('Sending Mail to %s with passwordreset token: %s', email,token);
};


