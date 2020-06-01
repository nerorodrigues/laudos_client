import React from "react";
import ListarExamesPorClienteContainer from "../../Graphql/containers/Queries/Exame/listarExamesPorCliente";
import { EXAME_SALVO_SUBSCRIPTION } from "../../Graphql/containers/Subscriptions/Exame/exameSalvo";
import CardList from "../../Components/CardList";
import List from "../../Components/List";

class ExamsByCompany extends React.Component {

    constructor(props) {
        super(props);
        this.filtrar = this.filtrar.bind(this);
        this.state = {
            exibicaoTabela: true,
            filter: '',
        };
        console.log(1);
    }

    componentDidMount() {
        this.props.refetch()
        console.log(1);
        this.props.subscribeToMore({
            document: EXAME_SALVO_SUBSCRIPTION,
            variables: { id: 1 },//props.match.params.ID
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data)
                    return prev;
                const newlaudo = subscriptionData.data.laudoSalvo;
                if (!prev.listarExames.find((msg) => msg.id === newlaudo.id)) {
                    return Object.assign({}, prev, {
                        listarExames: Object.assign([], prev.listarExames, [...prev.listarExames, newlaudo])
                    });
                } else
                    return prev;
            }
        });
    }

    filtrar(elemento) {
        var result = elemento.protocolo.match(this.state.filter) || elemento.nome.match(this.state.filter);
        return result;
    }


    render() {
        if (this.props.loading)
            return <div>Loading...</div>
        else if (this.props.error)
            return <div>Erro...</div>
        var resultList = this.props.data.listarExamesPorCliente;
        if (this.state.filter && resultList)
            resultList = resultList.filter(this.filtrar);

        return (
            <div className='ui segment'>
                <div>Total de Registros: {this.props.data.listarExamesPorCliente.length}</div>
                <div>
                    Empresa: {this.props.selectedCompany?.name ?? 'Todas'}
                </div>
                <div className='tabelaContainer'>
                    {this.props.exibicaoTabela ? <CardList duration={500} data={resultList} /> : <List data={resultList} />}
                </div>
            </div>
        )
    }
}

export default ({ ...refs }) => <ListarExamesPorClienteContainer variables={refs.variables}>{({ ...props }) => <ExamsByCompany {...props} {...refs} />}</ListarExamesPorClienteContainer>