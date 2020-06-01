import React from "react";
import gql from "graphql-tag";
import { Query } from 'react-apollo';

var LISTAR_EXAMES_POR_CLIENTE = gql`
    query listarExamesPorCliente($companyId: ID){
        listarExamesPorCliente(companyId: $companyId){
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

export default ({ children, variables }) => <Query variables={variables} query={LISTAR_EXAMES_POR_CLIENTE}>{children}</Query>