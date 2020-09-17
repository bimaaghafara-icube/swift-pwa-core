import { useQuery } from '@apollo/client';
import * as schema from './schema';

export const getBlog = (params = {}) => useQuery(schema.getAllPost, {
    ...params,
});

export const getCategory = (variables) => useQuery(schema.getCategory, {
    variables,
    skip: typeof window === 'undefined',
});

export const getDetailBlog = (id) => useQuery(schema.getPostById, {
    variables: {
        id,
    },
    skip: typeof window === 'undefined',
});

export default {};
