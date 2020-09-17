import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

export const register = () => useMutation(Schema.register, {
    context: {
        request: 'internal',
    },
});

export const otpConfig = () => useQuery(Schema.otpConfig);

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

export default {
    register,
};
