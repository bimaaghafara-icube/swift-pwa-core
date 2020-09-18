import { gql } from '@apollo/client';

export const localTotalCart = gql`
{
  totalCart @client
}
`;

export default {
    localTotalCart,
};
