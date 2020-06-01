import gql from "graphql-tag";
import { useMutation } from "react-apollo";

var EXAME_SCHEMA = gql(`
    mutation salvarExame($exame: ExameInput!){
        salvarExame(exame: $exame){
            id,
            protocolo,
            nome,
            dataExame
        }
    }
`);

const SalvarExameContainer = ({ children }) => {
    const [mutation, data] = useMutation(EXAME_SCHEMA)
    return children(mutation, data);
}

export default SalvarExameContainer ;