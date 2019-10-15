import logExeption from "./logExeption.mjs";

export default async (exeption, message) => {
    await logExeption(exeption);
    return await _generate(message);
};

async function _generate(message) {
    let err = new Error(message);
    err['status'] = 401;
    return err;
}