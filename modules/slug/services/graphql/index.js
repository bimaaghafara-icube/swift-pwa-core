import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getResolver = (urlpath) => useQuery(Schema.getResolver(urlpath));

export default { getResolver };
