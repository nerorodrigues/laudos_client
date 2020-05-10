import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

var schema = gql`
    mutation signIn($userName: String!, $password: String!){
        signIn(userName: $userName, password: $password){
            token
        }
    }
`


const SignInContainer = ({ children }) => {
    const [mutation, data] = useMutation(schema, { errorPolicy: 'ignore' })
    return children(mutation, data);
}

export default SignInContainer;