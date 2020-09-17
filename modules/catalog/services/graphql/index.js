import { useQuery, useMutation } from '@apollo/client';
import * as schemaCategory from './categorySchema';
import * as productSchema from './productSchema';

export const getProduct = (config) => useQuery(productSchema.getProduct(config));
export const getProductAgragations = () => useQuery(productSchema.getProductAgragations());
export const getCategory = (variables) => useQuery(schemaCategory.getCategory(variables));
export const getFilter = (catId) => useQuery(schemaCategory.getFilter(catId), { ssr: true });
export const addWishlist = () => useMutation(productSchema.addWishlist, {
    context: {
        request: 'internal',
    },
});

export default { getCategory };
