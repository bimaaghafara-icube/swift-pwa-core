import { gql } from '@apollo/client';

export const confirmPayment = gql`
mutation confirmPayment(
    $account_name: String!,
    $account_number: String!,
    $amount: Float!,
    $date: String!,
    $order_number: String!,
    $payment: String!,
    $filename: String!,
    $image_base64: String!
) {
    createConfirmPayment(
        input: {
          account_name: $account_name,
          account_number: $account_number,
          amount: $amount,
          date: $date,
          order_number: $order_number,
          payment: $payment,
          filename: $filename,
          image_base64: $image_base64
        }
      ) {
        success
      }
}
`;

export default {
    confirmPayment,
};
