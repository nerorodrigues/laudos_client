import gql from "graphql-tag";

export const EXAME_SALVO_SUBSCRIPTION = gql`
    subscription onLaudoSalvo($id: ID){
        laudoSalvo(id: $id){
            id,
            nome,
            protocolo,
            dataExame
            dataCadastro,
            exameUrl,
            laudoUrl
        }
    }
`