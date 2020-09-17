import { useQuery } from '@apollo/client';
import * as Schema from './schema';

let fetchPolicy = '';
fetchPolicy = 'cache-first';
// uncomment this line (set 'no-cache') to test loader/skeleton component
// fetchPolicy = 'no-cache';

export const getBannerSlider = () => useQuery(Schema.getBannerSlider, {
    fetchPolicy,
});
export const getFeaturedProducts = (variables) => useQuery(Schema.getFeaturedProducts, {
    variables,
    fetchPolicy,
});
export const getCategoryList = (variables) => useQuery(Schema.getCategoryList, {
    variables,
    fetchPolicy,
});

export default { getCategoryList, getBannerSlider, getFeaturedProducts };
