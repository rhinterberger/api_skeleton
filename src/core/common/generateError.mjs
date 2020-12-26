import logExeption from "./logExeption.mjs";

export default async (exeption, message, returncode) => {
    await logExeption(exeption);
    return await _generate(message, returncode);
};

async function _generate(message, returncode) {
    let err = new Error(message);
    err['status'] = returncode;
    return err;
}