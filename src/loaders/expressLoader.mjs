import Logger from './loggerLoader.mjs';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api/index.mjs';
import config from '../config/index.mjs';

async function configureRoutes(app)
{
    // Application Routes
    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });

    app.use(config.api.prefix, await routes());
}

async function configureCommonRequestHandling(app)
{
    // Common Configuration of request handling
    app.enable('trust proxy');
    app.use(cors());
    app.use(bodyParser.json());
}

async function configureErrorHandling(app)
{
    /// catch 404 and forward to error handler
    app.use((req, res, next) =>
    {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
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

export default async (app) => {

    try {
        await configureCommonRequestHandling(app);
        await configureRoutes(app);
        // Keep as last line! Order of Routes is relevant and ErrorHandlers are Catch-All Routes
        await configureErrorHandling(app);
        Logger.debug('Done Express Application');
    }
    catch(e) {
        Logger.error('FAILED Express Application')
        throw(e);
    }
};