import express from 'express';
import cors from 'cors';

import Services from "../common/serviceRegistry.mjs";

async function configureRoutes(app, modules)
{
    let config = Services.get('config');

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    app.use(config.api.prefix, await modules.routes({"caseSensitive": true}));
}

async function configureCommonRequestHandling(app)
{
    app.enable('case sensitive routing');
    app.enable('trust proxy');
    app.use(express.json());
    app.use(cors());
    app.use(Services.get('middleware').debugLogger);
}

async function configureErrorHandling(app)
{
    app.use((req, res, next) =>
    {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    app.use((err, req, res, next) =>
    {
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({message: err.message})
                .end();
        }
        return next(err);
    });

    app.use((err, req, res, next) =>
    {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
}

export default async (app, modules) => {

    let log = Services.get("logger");
    try {
        await configureCommonRequestHandling(app);
        await configureRoutes(app, modules);

        // Keep as last line! Order of Routes is relevant and ErrorHandlers are Catch-All Routes
        await configureErrorHandling(app);
        log.debug('Done Express Application');
    }
    catch(e) {
        log.error('FAILED Express Application')
        throw(e);
    }
};
