import { gql } from '@apollo/client';

const cartSubSelection = `
    id
    email
    dest_location {
        dest_latitude
        dest_longitude
    }
    billing_address {
        city
        company
        country {
            code
            label
        }
        firstname
        lastname
        postcode
        region {
            code
            label
        }
        street
        telephone
    }
    selected_payment_method {
        code
    }
    applied_coupons {
        code
    }
    shipping_addresses {
        selected_shipping_method {
            method_code
            carrier_code
            amount {
                value
                currency
            }
        }
        firstname
        lastname
        street
        city
        postcode
        telephone
        region {
            code
            label
        }
        company
        country {
            code
            label
        }
        available_shipping_methods {
            available
            method_code
            carrier_code
            method_title
            carrier_title
            amount {
                value
                currency
            }
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
        prices {
            row_total {
                currency
                value
            }
            discounts {
                amount {
                    currency
                    value
                }
                label
            }
            price {
                value
                currency
              }
        }
        product {
            id
            name
            categories {
              name
            }
            url_key
            sku
            stock_status
            small_image {
                url
                label
            }
          }
    }
    available_payment_methods {
        code
        title
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
    dest_location {
        dest_latitude
        dest_longitude
    }
    applied_cashback {
        data {
            amount
            promo_name
        }
        is_cashback
        total_cashback
    }
    addtional_fees {
        data {
          enabled
          fee_name
          frontend_type
          id_fee
          options {
            default
            label
            option_id
            price
          }
        }
        show_on_cart
      }
    applied_extra_fee {
        extrafee_value {
          currency
          value
        }
        select_options {
          default
          label
          option_id
          price
        }
        show_on_cart
        title
    }
    prices {
        discounts {
            amount {
                value
                currency
            }
            label
        }
        grand_total {
            value
            currency
        }
    }
`;

export const applyGiftCardToCart = gql`
    mutation($cartId: String! $code: String!) {
        applyGiftCardToCart(
            input: {
                cart_id: $cartId,
                giftcard_code: $code,
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const removeGiftCardFromCart = gql`
    mutation($cartId: String! $code: String!) {
        removeGiftCardFromCart(
            input: {
                cart_id: $cartId,
                giftcard_code: $code,
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const applyStoreCreditToCart = gql`
    mutation($cartId: String!) {
        applyStoreCreditToCart(
            input: {
                cart_id: $cartId
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const removeStoreCreditFromCart = gql`
    mutation($cartId: String!) {
        removeStoreCreditFromCart(
            input: {
                cart_id: $cartId
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const getCustomer = gql`
    query {
        customer {
            firstname
            lastname
            email
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
            store_credit {
                current_balance {
                    value
                }
                enabled
            }
            gift_card {
                giftcard_balance
                giftcard_code
            }
        }
    }
`;

export const getCart = gql`
    query Cart($cartId: String!) {
        cart(cart_id: $cartId) {
            ${cartSubSelection}
        }
    }
`;

export const setShippingAddressById = gql`
    mutation setShippingAddressById($addressId: Int!, $cartId: String!) {
        setShippingAddressesOnCart(input: { cart_id: $cartId, shipping_addresses: { customer_address_id: $addressId } }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setShippingAddressByInput = gql`
    mutation setShippingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $latitude: String
        $longitude: String
    ) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: {
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                        latitude: $latitude
                        longitude: $longitude
                        save_in_address_book: true
                    }
                }
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setBillingAddressById = gql`
    mutation setBillingAddressById($addressId: Int!, $cartId: String!) {
        setBillingAddressOnCart(input: { cart_id: $cartId, billing_address: { same_as_shipping: true, customer_address_id: $addressId } }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setBillingAddressByInput = gql`
    mutation setBillingAddressByInput(
        $cartId: String!
        $city: String!
        $countryCode: String!
        $firstname: String!
        $lastname: String!
        $telephone: String!
        $postcode: String!
        $street: String!
        $region: String!
        $latitude: String
        $longitude: String
    ) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    same_as_shipping: true
                    address: {
                        city: $city
                        country_code: $countryCode
                        firstname: $firstname
                        lastname: $lastname
                        telephone: $telephone
                        region: $region
                        street: [$street]
                        postcode: $postcode
                        latitude: $latitude
                        longitude: $longitude
                        save_in_address_book: true
                    }
                }
            }
        ) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setShippingMethod = gql`
    mutation setShippingMethod($cartId: String!, $carrierCode: String!, $methodCode: String!) {
        setShippingMethodsOnCart(input: { cart_id: $cartId, shipping_methods: { carrier_code: $carrierCode, method_code: $methodCode } }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setPaymentMethod = gql`
    mutation setPaymentMethod($cartId: String!, $code: String!) {
        setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: { code: $code } }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const setGuestEmailAddressOnCart = gql`
    mutation($cartId: String!, $email: String!) {
        setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const placeOrder = gql`
    mutation($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
                order_id
            }
        }
    }
`;

export const applyCouponToCart = gql`
    mutation($cartId: String!, $coupon: String!) {
        applyCouponToCart(input: { cart_id: $cartId, coupon_code: $coupon }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const removeCouponFromCart = gql`
    mutation($cartId: String!) {
        removeCouponFromCart(input: { cart_id: $cartId }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const applyRewardPointsToCart = gql`
    mutation($cartId: String!) {
        applyRewardPointsToCart(input: { cart_id: $cartId }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const removeRewardPointsFromCart = gql`
    mutation($cartId: String!) {
        removeRewardPointsFromCart(input: { cart_id: $cartId }) {
            cart {
                ${cartSubSelection}
            }
        }
    }
`;

export const getSnapToken = gql`
    query($orderId: String!) {
        getSnapTokenByOrderId(order_id: $orderId) {
            snap_token
        }
    }
`;

export const getSnapOrderStatusByOrderId = gql`
    query($orderId: String!) {
        getSnapOrderStatusByOrderId(order_id: $orderId) {
            order_id
            status_message
            success
            cart_id
        }
    }
`;

export const getRewardPoint = gql`
    query {
        customerRewardPoints {
            balance
            balanceCurrency
            formatedBalanceCurrency
            formatedSpendRate
            spendRate
            transaction_history {
                total_count
                page_info {
                    current_page
                    page_size
                    total_pages
                }
                items {
                    balance
                    comment
                    expirationDate
                    points
                    transactionDate
                    transactionId
                }
            }
        }
    }
`;

export const getPickupStore = gql`
    query getPickupStore($cart_id: String!) {
        getPickupStore(cart_id: $cart_id) {
            store {
                code
                street
                city
                name
                region
                zone
                telephone
                postcode
                lat
                long
                country_id
                items {
                    qty
                    quote_id
                    sku
                }
            }
        }
    }
`;

export const setPickupStore = gql`
mutation setPickupStore(
    $cart_id: String!,
    $code: String!,
    $extension_attributes: PickupStoreExtensionAttributes!,
    $store_address: PickupStoreAddress!
) {
    setPickupStore(input: {
        cart_id: $cart_id
        code: $code
        extension_attributes: $extension_attributes
        store_address: $store_address
    }) {
      ${cartSubSelection}
    }
  }
`;

export const removePickupStore = gql`
mutation removePickupStore(
    $cart_id: String!,
)  {
    removePickupStore(input: {
      cart_id: $cart_id
    }) {
      ${cartSubSelection}
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

export const mergeCart = gql`
mutation mergeCart(
    $sourceCartId: String!,
    $destionationCartId: String!
) {
    mergeCarts(
      source_cart_id:$sourceCartId,
      destination_cart_id: $destionationCartId
    ) {
      id
      total_quantity
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

export const updateExtraFee = gql`
mutation updateExtraFee(
    $cart_id: String!,
    $select_options: [SelectOptionFees],
){
    updateExtraFeeOnCart(input: {
        cart_id: $cart_id,
        select_options: $select_options
    }) {
        cart {
            ${cartSubSelection}
        }
    }
}
`;
