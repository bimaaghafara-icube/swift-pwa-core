/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';
import { features, modules } from '@config';
/**
 * generate dynamic filter query
 * @param catId number
 * @param filter array of filter value
 * @returns string query to generate on grapql tag
 */
const filterProduct = (filter) => {
    let queryFilter = '{ ';
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < filter.length; index++) {
        const detailFilter = filter[index];
        if (detailFilter.type === 'price') {
            queryFilter += `
          ,${detailFilter.type} : {
            from: "${detailFilter.from}"
            to: "${detailFilter.to}"
          }
        `;
        } else if (typeof detailFilter.value === 'object') {
            let inFilter = '';
            // eslint-disable-next-line no-plusplus
            for (let idx = 0; idx < detailFilter.value.length; idx++) {
                inFilter += `${idx !== 0 ? ',' : ''}"${detailFilter.value[idx]}"`;
            }
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                in: [${inFilter}]
              }`;
        } else {
            queryFilter += `${index !== 0 ? ',' : ''} ${detailFilter.type} : {
                  eq: "${detailFilter.value}"
                }`;
        }
    }
    queryFilter += '}';
    return queryFilter;
};

export const getProductAgragations = () => gql`
  {
    products(search:"") {
      aggregations {
        attribute_code
      }
    }
  }
`;

/**
 * scema dynamic product
 * @param catId number
 * @param config Object {pageSize: number, currentPage: Number}
 * @returns grapql query
 */

export const getProduct = (config = {}) => gql`
    query getProducts(
      $pageSize: Int,
      $currentPage: Int,
    ){
    products( search: "${config.search}" ,filter: ${filterProduct(config.filter)},
    pageSize: $pageSize,
    currentPage: $currentPage
    ${
    config.sort
        ? `, sort: {${config.sort.key} : ${config.sort.value}}`
        : ''
}
      ) {
        total_count
        ${!config.customFilter
        ? `aggregations {
          attribute_code
          label
          options {
            count
            label
            value
          }
        }` : ''}
        __typename
        items {
          id
          sku
          name
          url_key
          ${modules.catalog.productListing.configurableOptions ? `review {
            rating_summary
            reviews_count
          }` : ''}
          small_image {
            url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
            label
          }
          categories {
            name
          }
          __typename
          price_tiers {
            discount {
              percent_off
              amount_off
            }
            final_price {
              currency
              value
            }
            quantity
          }
          price_range {
            maximum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
            minimum_price {
              discount{
                amount_off
                percent_off
              }
              final_price {
                currency
                value
              }
              regular_price {
                currency
                value
              }
            }
          }

          special_from_date
          special_to_date
          new
          new_from_date
          new_to_date
          sale
          ${modules.catalog.productListing.configurableOptions ? `
          ... on ConfigurableProduct {
            configurable_options {
              id
              attribute_id
              label
              attribute_code
              values {
                value_index
                label
                swatch_data {
                  value
                  ... on ImageSwatchData {
                    thumbnail
                    value
                  }
                  ... on ColorSwatchData {
                    value
                  }
                  ... on TextSwatchData {
                    value
                  }
                }
              }
              product_id
            }
            variants {
              attributes {
                code
                label
                value_index
              }
              product {
                id
                sku
                stock_status
                ${modules.catalog.productListing.rating
        ? `review {
                  rating_summary
                  reviews_count
                }`
        : ''}
                price_tiers {
                  discount {
                    percent_off
                    amount_off
                  }
                  final_price {
                    currency
                    value
                  }
                  quantity
                }
                price_range {
                  maximum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                  minimum_price {
                    discount {
                      amount_off
                      percent_off
                    }
                    final_price {
                      currency
                      value
                    }
                    regular_price {
                      currency
                      value
                    }
                  }
                }
                special_from_date
                special_to_date
                new
                new_from_date
                new_to_date
                sale
                small_image{
                  url(width: ${features.imageSize.product.width}, height: ${features.imageSize.product.height}),
                  label
                }
                image {
                  url
                  label
                }
              }
            }
          }
          ` : ''}
        }
      }
    }
  `;

export const addWishlist = gql`
    mutation addWishlist($productId: Int!) {
        addProductToWishlist(productId: $productId) {
            info
        }
    }
`;
