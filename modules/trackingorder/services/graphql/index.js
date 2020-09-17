/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getTrackingOrder = (params) => useQuery(Schema.getTrackingOrder, {
    context: {
        request: 'internal',
    },
    variables: params,
    skip: typeof window === 'undefined',
    fetchPolicy: 'network-only',
});

export const getCustomer = () => useQuery(Schema.getCustomer, {
    variables: {},
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'cache-and-network',
});
