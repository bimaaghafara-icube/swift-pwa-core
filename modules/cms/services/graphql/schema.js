import { gql } from '@apollo/client';

export const getCmsPage = gql`
    query($identifier: String!) {
        cmsPage(identifier: $identifier) {
            identifier
            content
            meta_description
            meta_keywords
            title
            url_key
        }
    }
`;

export default { getCmsPage };
