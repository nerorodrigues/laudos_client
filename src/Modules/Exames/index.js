import React from "react";
import ListarExamesContainer from "../../Graphql/containers/Queries/Exame/listarExames";
import { Modal, Header, Menu } from "semantic-ui-react";
import FormCadastrarExame from "../Forms/CadastrarExame";
import './examesList.css'
import { EXAME_SALVO_SUBSCRIPTION } from "../../Graphql/containers/Subscriptions/Exame/exameSalvo";
import CardList from "../../Components/CardList";
import List from "../../Components/List";

class Registries extends React.Component {
    constructor(props) {
        super(props);
        this.buttonClickHandler = this.buttonClickHandler.bind(this);
        this.cadastrarExameCloseHandler = this.cadastrarExameCloseHandler.bind(this);
        this.modoExibicao = this.modoExibicao.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filtrar = this.filtrar.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.cadastroFinalizadoHandler = this.cadastroFinalizadoHandler.bind(this);
        this.state = {
            isCadastrarExameOpen: false,
            isCadastroFinalizadoModalOpen: false,
            exibicaoTabela: true,
            filter: '',
            cadastraExameResult: null
        };

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

    buttonClickHandler() {
        this.setState({
            isCadastrarExameOpen: !this.state.isCadastrarExameOpen
        });
    }
    cadastrarExameCloseHandler() {
        this.setState({
            isCadastrarExameOpen: false
        });
    }

    modoExibicao(isTabela) {
        this.setState({
            exibicaoTabela: isTabela
        });
    }
    handleInputChange(evt) {
        var target = evt.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState({
            [name]: value
        });
    }

    filtrar(elemento) {
        var result = elemento.protocolo.match(this.state.filter) || elemento.nome.match(this.state.filter);
        return result;
    }

    submitHandle(result) {
        this.setState({
            isCadastrarExameOpen: false,
            isCadastroFinalizadoModalOpen: true,
            cadastraExameResult: result
        });
    }

    cadastroFinalizadoHandler() {
        this.setState({
            isCadastroFinalizadoModalOpen: false
        })
    }

    render() {
        if (this.props.loading)
            return <div>Loading...</div>
        else if (this.props.error)
            return <div>Erro...</div>

        var resultList = this.props.data.listarExames
        if (this.state.filter)
            resultList = this.resultList.filter(this.filtrar);

        return (
            <div>
                <div className='ui menu'>
                    <a className="item" onClick={this.buttonClickHandler}>
                        <i aria-hidden="true" className="add icon"></i>
                        Novo Exame
                    </a>
                    <div className='right menu'>
                        <Menu.Item active={!this.state.exibicaoTabela} onClick={() => this.modoExibicao(false)}>
                            <i aria-hidden='true' className='icon list' />
                        </Menu.Item>
                        <Menu.Item active={this.state.exibicaoTabela} onClick={() => this.modoExibicao(true)}>
                            <i aria-hidden='true' className='icon th' />
                        </Menu.Item>
                        <div className='item'>
                            <div className='ui icon input'>
                                <input type='text' placeholder='Filtro' name='filter' value={this.state.filter} onChange={this.handleInputChange} />
                                <i aria-hidden='true' className='search icon' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ui segment'>
                    <div>Total de Registros: {this.props.data.listarExames.length}</div>
                    <div className='tabelaContainer'>
                        {this.state.exibicaoTabela? <CardList data={resultList} /> : <List data={resultList} />}
                    </div>
                </div>
                <Modal onClose={this.cadastrarExameCloseHandler} open={this.state.isCadastrarExameOpen}>
                    <Header icon='upload' content="Cadastrar novo exame" />
                    <Modal.Content>
                        <FormCadastrarExame onSubmited={this.submitHandle} />
                    </Modal.Content>
                </Modal>
                <Modal onClose={this.cadastroFinalizadoHandler} open={this.state.isCadastroFinalizadoModalOpen}>
                    <Header icon={this.state?.cadastraExameResult?.status === 'Sucesso' ? 'green icon check' : 'red icon thumbs down'}></Header>
                    <Modal.Content>
                        <div>
                            {this.state.cadastraExameResult?.message}
                        </div>
                    </Modal.Content>
                </Modal>
            </div >
        )
    }
}

export default () => (<ListarExamesContainer>{({ ...props }) => <Registries {...props} />}</ListarExamesContainer>)
