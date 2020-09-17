import { useLazyQuery, useQuery, useMutation } from '@apollo/client';
import * as Schema from './schema';

const config = {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
};

export const getCountries = () => useLazyQuery(Schema.getCountries);

export const getCityByRegionId = (options = {}) => useLazyQuery(Schema.getCityByRegionId, { ...options, fetchPolicy: 'network-only' });

export const getCustomer = () => useQuery(Schema.getCustomer, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
    fetchPolicy: 'no-cache',
});

export const getCustomerOrder = () => useQuery(Schema.getCustomerOrder, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const getCustomerSettings = () => useQuery(Schema.getCustomerSettings, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const removeToken = () => useMutation(Schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const customerNotificationList = () => useQuery(Schema.customerNotificationList, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export const getCmsBlocks = (variables) => useQuery(Schema.getCmsBlocks, { variables });

export const getGiftCard = () => useQuery(Schema.getGiftCard, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const checkBalance = (code) => useQuery(Schema.checkBalance, {
    context: {
        request: 'internal',
    },
    variables: {
        gift_card_code: code,
    },
    skip: code === '' || !code,
});

export const updatedDefaultAddress = (options = {}) => useMutation(Schema.updatedDefaultAddress, {
    ...options,
    ...config,
});

export const updateCustomerAddress = (options = {}) => useMutation(Schema.updateCustomerAddress, {
    ...options,
    ...config,
});

export const createCustomerAddress = (options = {}) => useMutation(Schema.createCustomerAddress, {
    ...options,
    ...config,
});

export const updateCustomer = (options = {}) => useMutation(Schema.updateCustomer, {
    ...options,
    ...config,
});

export const updateCustomerProfile = (options = {}) => useMutation(Schema.updateCustomerProfile, {
    ...options,
    ...config,
});

export const changeCustomerPassword = (options = {}) => useMutation(Schema.changeCustomerPassword, {
    ...options,
    ...config,
});

export const addSimpleProductsToCart = () => useMutation(Schema.addSimpleProductsToCart, {
    context: {
        request: 'internal',
    },
});

export const removeWishlist = () => useMutation(Schema.removeWishlist, {
    context: {
        request: 'internal',
    },
});

export const getCustomerCartId = () => useLazyQuery(Schema.getCartIdUser, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export const newPassword = () => useMutation(Schema.setNewPassword);

export default {
    getCountries, getCityByRegionId, customerNotificationList, getCustomer, getCustomerOrder,
};
