import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getStoreLocations = (variables) => useQuery(Schema.getStoreLocations, {
    variables,
    context: {
        request: 'internal',
    },
    skip: typeof window === 'undefined',
    fetchPolicy: 'no-cache',
});

export default { getStoreLocations };
