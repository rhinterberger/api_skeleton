import generateError from '../../../../../core/common/generateError.mjs';
import RegistrationService from "../../../services/registrationService.mjs";

export default async (req, res, next) =>
{
    try {
        await new RegistrationService().confirmRegister(req.query.token);
        return res.json({'confirmation': 'successful'}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'ConfirmRegister failed', 401));
    }
};

