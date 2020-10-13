import { gql } from '@apollo/client';

/**
 * scema dynamic category
 * @param variables Object {id: number, productSize: Number}
 * @returns grapql query
 */

export const getCategory = (
    variables = {
        productSize: 10,
    },
) => gql`
    {
        categoryList(filters: { ids: { eq: "${variables.id}" } }) {
          id
          name
          description
          url_path
          image
          image_path
          breadcrumbs {
            category_id
            category_name
            category_url_path
          }
          children {
            id
            name
            image
            url_path
          }
          cms_block {
            content
            identifier
            title
          } 
          display_mode
        }
    }
    `;

/**
 * scema dynamic get attribute filter
 * @param category_id number
 * @returns grapql query
 */

export const getFilter = (catID) => gql`
    {
        getFilterAttributeOptions (catid:${catID}) {
            code
            data {
                field
                id
                label
                maxprice
                minprice
                value {
                    label
                    value
                }
            }
            message
            status
        }
    }
`;
