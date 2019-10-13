import Config from '../config/index.mjs';
import pg from 'pg';
import Logger from "./loggerLoader.mjs";
import queryLoader from './sqlqueryloader.mjs';
import ApiDB from '../services/dbService.mjs';

export default async () => {

    try {
        const db = await pg.Pool({connectionString: Config.databaseURL});
        const queries = await queryLoader();

        const res = await db.query("select now()");
        Logger.debug(' Test Query "select now()": %s', res.rows[0])
        Logger.debug('Done DB connection!');

        return new ApiDB(db, queries);
    }
    catch (e) {
        Logger.error('🔥 Error on Database loader: %o', e);
        throw e;
    }
}

