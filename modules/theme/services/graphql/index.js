/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import schema from './schema';

export const getCategories = () => useQuery(schema.categories);
export const getCategoryByName = (name) => useLazyQuery(schema.getCategoryByName(name));
export const getProduct = (key) => useLazyQuery(schema.getProduct(key));
export const getVesMenu = (options) => useQuery(schema.vesMenu, options);

export const getCustomer = () => useQuery(schema.getCustomer, {
    context: {
        request: 'internal',
        skip: typeof window === 'undefined',
    },
});

export const removeToken = () => useMutation(schema.removeToken, {
    context: {
        request: 'internal',
    },
});

export const getCmsBlocks = (variables) => useQuery(schema.getCmsBlocks, { variables });

export default {
    getCmsBlocks,
    getCategories,
    getCustomer,
    removeToken,
    getVesMenu,
    getProduct,
    getCategoryByName,
};
