import Router from 'express-promise-router';

import auth from './routes/auth.mjs';
import user from './routes/user.mjs';

export default async () => {
    const router = Router();

    router.use('/auth', await auth());
    router.use('/user', await user());

    return router;
};