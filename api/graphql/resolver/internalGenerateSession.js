const { encrypt, decrypt } = require('../../../helpers/encryption');

const decryptState = (state) => {
    const raw = decrypt(state);
    const res = raw.split('-');
    const token = res[0];
    const cartId = res[1];

    const result = {
        token,
        cartId,
    };
    return result;
};

const internalGenerateSession = async (parent, { state }, context) => {
    const { token, cartId } = decryptState(state);
    if (typeof state !== 'undefined' && state) {
        if (token) {
            context.session.token = encrypt(token);
        }
        return {
            result: true,
            cartId,
            isLogin: !!token,
        };
    }
    return {
        result: false,
        cartId: null,
        isLogin: null,
    };
};

module.exports = internalGenerateSession;
