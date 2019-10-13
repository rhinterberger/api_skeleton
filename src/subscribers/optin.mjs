import mail from 'nodemailer';
import di from "typedi";

export default async (email, token) =>
{
    const logger = di.Container.get('logger');
    const config = di.Container.get('config');

    let smtp = mail.createTransport(config.smtpURL);
    await smtp.sendMail(await composeMail(email, token));

    logger.info('Sending Mail to %s with register token: %s', email,token);
};

async function composeMail(to, token)
{
    const config = di.Container.get('config');

    return {
      from: config.optin.from,
      to: to,
      subject: config.optin.subject,
      text: `
      Welcome to our Service. To activate your account please confirm your email address
      by clicking the following link:
      http://localhost:3000/api/v1/user/confirmregister?token=${token}
      
      This Activationtoken is valid for 24 Hours.     
      `
    };
}

