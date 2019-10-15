import Config from '../config/index.mjs';
import pg from 'pg';
import Logger from "./loggerLoader.mjs";

export default async () => {

    try {
        const db = await pg.Pool({connectionString: Config.databaseURL});


        const res = await db.query("select now()");
        Logger.debug(' Test Query "select now()": %s', res.rows[0])
        Logger.debug('Done DB connection!');

        return db;
    }
    catch (e) {
        Logger.error('🔥 Error on Database loader: %o', e);
        throw e;
    }
}

m