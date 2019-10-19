import di from 'typedi';
import generateError from '../../../util/generateError.mjs';

export default async (req, res, next) => {
    const userService = di.Container.get('userService');

    try {
        await userService.confirmRegister(req.query.token);
        return res.json({'confirmation': 'successful'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'ConfirmRegister failed'));
    }
};
