import ConfirmationService from "../../services/confirmationService.mjs";

export default async (req, res, next) => {
    const confirmationService = new ConfirmationService();
    if(req.user.confirmation !== undefined && await confirmationService.isValid(req.user.confirmation, 'dopassreset'))
        return next();

    console.log(req.user);
    return res.json({'token': 'invalid'}).status(401);
};