import di from 'typedi';
import generateError from '../../../../../util/generateError.mjs';

export default async (req, res, next) => {
    const authService = di.Container.get('authService');

    try {
        const pubkey = await authService.getPubKey();
        return res.json({pubkey}).status(200);
    }
    catch(e)
    {
        return next(await generateError(e,'GetPubKey failed', 401));
    }
};

