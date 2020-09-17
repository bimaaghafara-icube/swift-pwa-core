/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import { getBrandsData } from './shema';

export const getBrands = (variables) => useQuery(getBrandsData, {
    variables,
});
