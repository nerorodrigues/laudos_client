import React from "react";
import gql from "graphql-tag";
import { Query } from 'react-apollo';

const LISTAR_EXAMES = gql`
    query listarExames{
        listarExames{
            id,
            protocolo,
            dataExame,
            nome,
            dataCadastro,
            exameUrl,
            laudoUrl
        }
    }
`

export default ({ children }) => <Query query={LISTAR_EXAMES}>{children}</Query>