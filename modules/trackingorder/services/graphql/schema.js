/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const getTrackingOrder = gql`
query getTrackingOrder($email: String,$order_id: String) {
   ordersFilter(filters: { email: $email, ids: { eq: $order_id } }) {
       data {
           id
           grand_total
           order_number
           status
           status_label
           detail {
               payment {
                   method
                   additional_information
                   payment_additional_info {
                       method_title
                   }
               }
               shipping_methods {
                   shipping_description
               }
               shipping_address {
                   firstname
                   lastname
               }
               items {
                   name
               }
           }
       }
   }
}
`;

export const getCustomer = gql`
{
    customer {
      id
      firstname
      lastname
      email
    }
  }
`;
