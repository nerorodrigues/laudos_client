import React from "react";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from "@apollo/react-hooks";


const url = false ? "https://laudos.herokuapp.com/graphql" : "http://localhost:3000/graphql";
const ws = false ? "wss://laudos.herokuapp.com/subscriptions" : "ws://localhost:3000/subscriptions";
const httpClient = () => createUploadLink({
    uri: url, credentials: 'include', headers: {
        'authorization': localStorage.getItem('AuthToken') || ''
    }
});
const wsLink = () => new SubscriptionClient(ws, {
    reconnect: true,
    connectionParams: {
        authToken: localStorage.getItem('AuthToken') || ''
    }
});

const link = () => split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    }, wsLink(), httpClient()
);

const cliente = () => new ApolloClient({
    link: link(),
    cache: new InMemoryCache()
});

export default ({children}) => (
    <ApolloProvider client={cliente()}>
        {children}
    </ApolloProvider>
);
