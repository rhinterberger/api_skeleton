import generateError from '../../../../../util/generateError.mjs';
import RegistrationService from "../../../services/registrationService.mjs";

export default async (req, res, next) =>
{
    try
    {
        const uuid = await new RegistrationService().register(req.body.username,req.body.password);
        return res.json({'uuid':uuid}).status(200);
    }
    catch (e)
    {
        return next(await generateError(e,'Register new user failed', 200));
    }
};

