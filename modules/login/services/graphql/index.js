import { useMutation, useLazyQuery, useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getToken = () => useMutation(Schema.getCustomerToken, {
    context: {
        request: 'internal',
    },
});

export const getTokenOtp = () => useMutation(Schema.getCustomerTokenOtp, {
    context: {
        request: 'internal',
    },
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const requestOtpRegister = () => useMutation(Schema.requestOtpRegister);
export const checkOtpRegister = () => useMutation(Schema.checkOtpRegister);
export const requestOtpLogin = () => useMutation(Schema.requestOtpLogin);
export const checkOtpLogin = () => useMutation(Schema.checkOtpLogin);
export const requestOtpForgotPassword = () => useMutation(Schema.requestOtpForgotPassword);
export const checkOtpForgotPassword = () => useMutation(Schema.checkOtpForgotPassword);

export const mergeCart = () => useMutation(Schema.mergeCart, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const otpConfig = () => useQuery(Schema.otpConfig);

export default {
    getToken,
    getTokenOtp,
};
