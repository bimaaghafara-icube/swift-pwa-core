/* eslint-disable import/prefer-default-export */

import { gql } from '@apollo/client';

export const getCountries = gql`
  {
    countries {
      id
      full_name_locale
      full_name_english
      available_regions {
        id
        code
        name
      }
    }
  }
`;

export const getCityByRegionId = gql`
  query Cities($regionId: Int!) {
    getCityByRegionId(region_id: $regionId) {
      item {
        id
        city
        postcode
      }
    }
  }
`;

// schema settingsPage

export const updateCustomer = gql`
    mutation updateCustomerSetting($isSubscribed: Boolean!) {
        updateCustomer(
            input: {
              is_subscribed: $isSubscribed
            }
          ) {
            customer {
                is_subscribed
            }
          }
    }
`;

export const getCustomerSettings = gql`
{
    customer {
     firstname
     lastname
     email
     is_subscribed
    }
  }
`;

const productDetail = `
    id
    name
    sku
    stock_status
    url_key
    __typename
    attribute_set_id
    small_image{
      url
    }
    image{
      url
    }
    review {
      rating_summary
      reviews_count
    }
    special_from_date
    special_to_date
    `;
const priceRange = `
    price_range {
      minimum_price {
        discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
      maximum_price {
         discount {
          amount_off
          percent_off
        }
        final_price {
          currency
          value
        }
        fixed_product_taxes {
          amount {
            currency
            value
          }
          label
        }
        regular_price {
          currency
          value
        }
      }
    }
    `;

const priceTiers = `
    price_tiers {
      discount {
        amount_off
        percent_off
      }
      final_price {
        currency
        value
      }
      quantity
    }
    `;

export const getCustomer = gql`
{
    customer {
      id
      firstname
      lastname
      email
      is_subscribed
      phonenumber
      whatsapp_number
      addresses {
        id
        city
        default_billing
        default_shipping
        custom_attributes {
            attribute_code
            value
        }
        extension_attributes {
            attribute_code
            value
        }
        firstname
        lastname
        postcode
        country_code
        region {
            region
            region_code
        }
        street
        telephone
    }
     wishlist {
      id
      items {
        id
        product {
          ${productDetail}
          ${priceRange}
          ${priceTiers}
        }
      }
    }
    }
  }
`;

export const removeToken = gql`
mutation {
  internalDeleteCustomerToken{
    result
  }
}
`;

export const customerNotificationList = gql`
    query customerNotificationList {
        customerNotificationList {
          totalUnread
          items {
            content
            createdAt
            entityId
            subject
            unread
          }
        }
    }
`;

export const getCmsBlocks = gql`
    query($identifiers: [String]) {
        cmsBlocks(identifiers: $identifiers) {
            items {
                identifier
                title
                content
            }
        }
    }
`;

export const getGiftCard = gql`
    {
        customer {
            gift_card {
                giftcard_code
                giftcard_balance
            }
        }
    }
`;

export const checkBalance = gql`
   query checkBalance($gift_card_code: String!) {
        giftCardAccount(input:{
            gift_card_code: $gift_card_code
        }){
            code
            balance
            initial_balance
            expiration_date
        }
    }
`;

export const updatedDefaultAddress = gql`
    mutation updatedDefaultAddress($addressId: Int!, $street: String!) {
        updateCustomerAddress(id: $addressId, input: { default_billing: true, default_shipping: true, street: [$street] }) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerAddress = gql`
    mutation updateCustomerAddress(
        $city: String!
        $countryCode: CountryCodeEnum!
        $customAttributes: [CustomerAddressAttributeInput]
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $addressId: Int!
        $region: String!
        $regionCode: String
        $regionId: Int
    ) {
        updateCustomerAddress(
            id: $addressId
            input: {
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                custom_attributes: $customAttributes
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const createCustomerAddress = gql`
    mutation createCustomerAddress(
        $city: String!
        $countryCode: CountryCodeEnum!
        $customAttributes: [CustomerAddressAttributeInput]
        $defaultBilling: Boolean!
        $defaultShipping: Boolean!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $regionCode: String
        $regionId: Int
    ) {
        createCustomerAddress(
            input: {
                city: $city
                country_code: $countryCode
                country_id: $countryCode
                custom_attributes: $customAttributes
                default_billing: $defaultBilling
                default_shipping: $defaultShipping
                firstname: $firstname
                lastname: $lastname
                postcode: $postcode
                street: [$street]
                telephone: $telephone
                region: { region: $region, region_code: $regionCode, region_id: $regionId }
            }
        ) {
            id
            city
            default_billing
            default_shipping
        }
    }
`;

export const updateCustomerProfile = gql`
    mutation updateCustomer(
        $firstname: String!,
        $lastname: String!,
        $email: String!,
        $password: String!
        $whatsapp_number: String,
        $phonenumber: String,
    ) {
        updateCustomerCustom(
            input: {
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password,
                whatsapp_number: $whatsapp_number,
                phonenumber: $phonenumber,
            }
        ) {
            customer {
                firstname
                lastname
                email
            }
        }
    }
`;

export const changeCustomerPassword = gql`
    mutation changeCustomerPassword($currentPassword: String!, $newPassword: String!) {
        changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            firstname
            lastname
            email
        }
    }
`;

export const addSimpleProductsToCart = gql`
mutation addSimpleProductsToCart(
    $cartId: String!,
    $qty: Float!,
    $sku: String!,
) {
    addSimpleProductsToCart(input:{
      cart_id: $cartId,
      cart_items: {
        data: {
          quantity: $qty,
          sku: $sku
        }
      }
    }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

export const removeWishlist = gql`
    mutation removeWishlist($wishlistItemId: Int!) {
        removeItemWishlist(wishlistItemId: $wishlistItemId) {
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

export const setNewPassword = gql`
    mutation (
        $password: String!,
        $confirmPassword: String!,
        $token: String!
    ) {
        setNewPassword(input: { 
            password: $password, 
            password_confirmation: $confirmPassword, 
            token: $token }) {
            info
        }
    }
`;

export const getCustomerOrder = gql`
  {
    customerOrders(pageSize: 5) {
      items {
        id
        grand_total
        order_number
        status
        status_label
        created_at
        detail {
          global_currency_code
          shipping_address {
            firstname
            lastname
          }
          grand_total
        }
      }
    }
  }
`;
