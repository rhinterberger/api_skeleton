import pg from 'pg';
import Service from "../common/serviceRegistry.mjs";

export default async () => {

    let log = Service.get("logger");
    let config = Service.get("config");
    try {
        const db = await new pg.Pool({connectionString: config.databaseURL});

        const res = await db.query("select now()");
        log.debug(' Test Query "select now()": %s', res.rows[0])
        log.debug('Done DB connection!');

        return db;
    }
    catch (e) {
        log.error('🔥 Error on Database loader: %o', e);
        throw e;
    }
}