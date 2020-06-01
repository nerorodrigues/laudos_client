import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const GET_COMPANIES = gql`
    query getCompanies{
        getCompanies{
            id
            name
        }
    }
`

export default ({ children }) => <Query query={GET_COMPANIES}>{children}</Query>