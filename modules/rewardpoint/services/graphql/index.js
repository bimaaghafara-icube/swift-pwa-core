/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as Schema from './scema';

export const getRewardPoint = (variables) => useQuery(Schema.getRewardPoint, {
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
    variables,
});
