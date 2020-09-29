/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import * as Schema from './schema';

export const addWishlist = () => useMutation(Schema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export const getCartData = () => useQuery(Schema.getCart,
    {
        context: {
            request: 'internal',
        },
        fetchPolicy: 'cache-and-network',
    });

export const getMiniCartData = (cartId) => useLazyQuery(Schema.getMiniCart,
    {
        variables: { cartId },
        context: {
            request: 'internal',
        },
        fetchPolicy: 'no-cache',
    });

export const getCountCart = (cartId) => useQuery(Schema.getCountCart, {
    context: {
        request: 'internal',
    },
    variables: {
        cartId,
    },
    skip: cartId === '' || typeof cartId === 'undefined',
});
