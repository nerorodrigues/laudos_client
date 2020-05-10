import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";

const query = gql`
    query getUser{
        getUser{
            userName
        }
    }
`;

export default ({ children }) => <Query query={query}>{children}</Query>;