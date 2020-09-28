import { gql } from '@apollo/client';

export const localTotalCart = gql`
{
  totalCart @client
}
`;

export const localResolver = gql`
  {
    resolver @client
  }
`;

export default {
    localTotalCart,
    localResolver,
};
