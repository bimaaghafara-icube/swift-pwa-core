/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const categories = gql`
    {
        categoryList {
            children_count
            children {
                id
                level
                name
                path
                url_path
                url_key
                include_in_menu
                children {
                    id
                    level
                    name
                    path
                    url_path
                    url_key
                    children {
                        id
                        level
                        name
                        path
                        url_path
                        url_key
                    }
                }
            }
        }
    }
`;

export const vesMenu = gql`
    query getVesMenu(
        $alias: String!
    ) {
        vesMenu(
          alias: $alias
        )
        {
          menu_id
          name
          items {
            id
            name
            link
            content_type
            link_type
            children {
              id
              name
              link
              link_type
              children {
               id
               name
               link
               link_type
               children {
                id
                name
                link
                link_type
                }
              }
            }
          }
        }
      }
`;
