import { gql } from '@apollo/client';

const orderOutput = `
    current_page
    page_size
    total_count
    total_pages
    items {
        id
        grand_total
        status
        status_label
        order_number
        created_at
        detail {
            customer_email
            customer_firstname
            grand_total
            discount_amount
            global_currency_code
            state
            status
            subtotal
            total_item_count
            total_paid
            total_qty_ordered
            pickup_store {
                is_using_pickup_store
                pickup_person  {
                    email
                    handphone
                    name
                }
            }
            payment {
                additional_information
                payment_additional_info {
                    method_title
                    transaction_time
                    virtual_account
                    }
                method
                shipping_amount
                shipping_captured
            }
            shipping_address {
                firstname
                lastname
                email
                street
                city
                region
                country_id
                telephone
                postcode
            }
            billing_address {
                firstname
                lastname
                email
                street
                city
                region
                country_id
                telephone
                postcode
            }
            shipping_methods {
                shipping_description
            }
            coupon {
                code
                rule_name
                is_use_coupon
            }
            items {
                item_id
                parent_item_id
                sku
                name
                qty_ordered
                price
                discount_amount
                image_url
                categories {
                    entity_id
                    name
                }
                rating {
                    total
                    value
                }
                quantity_and_stock_status {
                    is_in_stock
                    qty
                }
            }
            aw_rma {
                status
            }
            
            aw_giftcard {
                giftcard_amount
                giftcard_detail {
                    giftcard_code
                    giftcard_amount_used
                }
            }
            
            aw_store_credit {
                is_use_store_credit
                store_credit_amount
                store_credit_reimbursed
            }
        }
    }
`;

export const getOrder = gql`
    query getCustomerOrder($pageSize: Int, $currentPage: Int) {
        customerOrders(pageSize: $pageSize, currentPage: $currentPage) {
            ${orderOutput}
        }
    }
`;

export const getOrderDetail = gql`
    query getCustomerOrder($order_id: String) {
        customerOrders(filters: { ids: { eq: $order_id } }) {
            ${orderOutput}
        }
    }
`;

export default {
    getOrder,
};
