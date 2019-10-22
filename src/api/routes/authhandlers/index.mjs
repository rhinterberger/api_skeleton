import login from "../authhandlers/login.mjs";
import initResetPass from "./initResetPass.mjs";
import confirmResetPass from "../authhandlers/confirmResetPass.mjs";
import executeResetPass from "./executeResetPass.mjs";

export default {
    login,
    initResetPass,
    confirmResetPass,
    executeResetPass
};