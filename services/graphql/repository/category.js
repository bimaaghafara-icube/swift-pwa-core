/* eslint-disable import/prefer-default-export */
import { useQuery } from '@apollo/client';
import * as CategorySchema from '../schema/category';

export const getCategories = () => useQuery(CategorySchema.categories);
export const getVesMenu = (params = {}) => useQuery(CategorySchema.vesMenu, {
    ...params,
});
