import express from 'express';

import Service from "./common/serviceRegistry.mjs";
import Loader from "./loaders/index.mjs";

export default async () => {
    const log = Service.get("logger");

    const app = express();
    try {
        await Loader(app);
        log.info('Init Complete');
    }
    catch (e) {
        log.error('Init failed: %o',e);
        throw(e);
    }

    return app;
};
