import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getStoreCredit = (variables) => useQuery(Schema.getStoreCredit, {
    variables,
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export default { getStoreCredit };
