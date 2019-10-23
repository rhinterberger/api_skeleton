import login from "../authhandlers/login.mjs";
import initResetPass from "./initResetPass.mjs";
import confirmResetPass from "../authhandlers/confirmResetPass.mjs";
import executeResetPass from "./executeResetPass.mjs";
import refreshToken from "./refreshToken.mjs";

export default {
    login,
    initResetPass,
    confirmResetPass,
    executeResetPass,
    refreshToken,
};