import React from "react";
import gql from "graphql-tag";
import { Query, useQuery } from 'react-apollo';

var LISTAR_EXAMES = gql`
    query listarExames{
        listarExames{
            id,
            protocolo,
            dataExame,
            nome
        }
    }
`

export default ({ children }) => <Query query={LISTAR_EXAMES}>{children}</Query>