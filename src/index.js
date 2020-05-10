import 'semantic-ui-css/semantic.min.css'
import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "@apollo/react-hooks";

const url = true ? "https://laudos.herokuapp.com/graphql" : "http://localhost:3000/graphql";
const httpClient = createUploadLink({ uri: url, credentials: 'include' });

const client = new ApolloClient({
    //credentials: 'include',
    link: httpClient,
    cache: new InMemoryCache()
});

var Client = () => (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)

ReactDom.render(<Client />, document.getElementById("root"));