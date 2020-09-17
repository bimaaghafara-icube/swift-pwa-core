import { useQuery } from '@apollo/client';
import * as Schema from './schema';

export const getCmsPage = (variables) => useQuery(Schema.getCmsPage, { variables });

export default { getCmsPage };
