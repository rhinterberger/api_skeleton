import dotenv from 'dotenv';
import fs from "fs";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const pubkey = fs.readFileSync(process.env.token_keypub);
const privkey = fs.readFileSync(process.env.token_key);

export default {

    port: parseInt(process.env.PORT, 10),
    baseURL: process.env.baseURL || 'http://localhost:3000',
    databaseURL: process.env.POSTGRESQL_URI,
    smtpURL: process.env.SMTP_URL,

    token : {
        secret: process.env.TOKEN_SECRET,
        expire: process.env.TOKEN_EXPIRE || '600s',
        activationexpire: process.env.ACTIVATION_EXPIRE || '86400',
        privkey : privkey.toString(),
        pubkey: pubkey.toString(),
        algorithm: process.env.token_algorithm,
    },

    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    api: {
        prefix: '/api/v1/',
    },

    optin: {
        from: process.env.optin_from,
        subject: process.env.optin_subject,
    },

    pwreset: {
        from: process.env.optin_from,
        subject: process.env.optin_subject,
    }
};
