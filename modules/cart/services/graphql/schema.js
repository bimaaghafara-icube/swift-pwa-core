/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
            applied_coupons {
                code
            }
            prices {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    currency
                    value
                }
            }
            applied_store_credit {
              store_credit_amount
              is_use_store_credit
            }
            applied_giftcard {
                giftcard_amount
                giftcard_detail {
                    giftcard_amount_used
                    giftcard_code
                }
            }
            applied_reward_points {
                is_use_reward_points
                reward_points_amount
            }
            applied_cashback {
                data {
                    amount
                    promo_name
                }
                is_cashback
                total_cashback
            }
            items {
              id
              quantity
              ... on ConfigurableCartItem {
                  configurable_options {
                  option_label
                  value_label
                }
              }
              ... on BundleCartItem {
                bundle_options {
                  label
                  type
                  values {
                    label
                    price
                    quantity
                  }
                }
              }
              prices {
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                price {
                  value
                  currency
                }
                row_total {
                  currency
                  value
                }
                total_item_discount {
                  currency
                  value
                }
            }
            product {
                id
                name
                small_image {
                  url
                  label
                }
                url_key
                sku
                stock_status
                categories {
                  name
                }
                crosssell_products {
                  id
                  name
                  url_key
                  sku
                  thumbnail {
                    url
                  }
                  small_image {
                    url,
                    label
                  }
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
                }
              }
          }
        }
    }
`;

export const getMiniCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
            prices {
                discounts {
                    amount {
                        currency
                        value
                    }
                    label
                }
                grand_total {
                    currency
                    value
                }
                subtotal_excluding_tax {
                  currency
                  value
                }
            }
            items {
              id
              quantity
              ... on ConfigurableCartItem {
                  configurable_options {
                  option_label
                  value_label
                }
              }
              ... on BundleCartItem {
                bundle_options {
                  label
                  type
                  values {
                    label
                    price
                    quantity
                  }
                }
              }
              prices {
                discounts {
                  amount {
                    currency
                    value
                  }
                }
                price {
                  value
                  currency
                }
                row_total {
                  currency
                  value
                }
                total_item_discount {
                  currency
                  value
                }
            }
            product {
                id
                name
                small_image {
                  url
                  label
                }
                url_key
                sku
              }
          }
        }
    }
`;

export const deleteCartitem = gql`
    mutation deleteCartItem($cartId: String!, $cart_item_id: Int!) {
      removeItemFromCart(
        input: { cart_id: $cartId, cart_item_id: $cart_item_id }
      ) {
        cart {
          id
          total_quantity
        }
      }
    }
`;

export const updateCartitem = gql`
    mutation updateCartItems($cartId: String!, $cart_item_id: Int!, $quantity: Float!) {
      updateCartItems(
        input: { 
          cart_id: $cartId,
          cart_items: {cart_item_id: $cart_item_id, quantity: $quantity }
        }
      ) {
        cart {
          id
          total_quantity
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

export const getCartIdUser = gql`
    {
        customerCart {
            id
        }
    }
`;

export const getCountCart = gql`
    query getCartData($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            total_quantity
        }
    }
`;
