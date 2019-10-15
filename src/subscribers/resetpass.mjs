import mail from 'nodemailer';
import di from "typedi";

export default async (email, token) =>
{
    const logger = di.Container.get('logger');
    const config = di.Container.get('config');

    let smtp = mail.createTransport(config.smtpURL);
    await smtp.sendMail(await composeMail(email, token));

    logger.info('Sending Mail to %s with passwordreset token: %s', email,token);
};

async function composeMail(to, token)
{
    const config = di.Container.get('config');

    return {
        from: config.pwreset.from,
        to: to,
        subject: config.pwreset.subject,
        text: `
      You have requested a reset of your password. To change your password, please visit following link:
      
      ${config.baseURL}/${config.api.prefix}/user/confirmresetpass?token=${token}
      
      This Token is valid for 24 Hours.     
      `
    };
}

