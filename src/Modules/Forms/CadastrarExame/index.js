import React from "react";
import "./index.css";
import DragAndDropUpload from "../../../Components/DragAndDropUpload";
import SalvarExameContainer from "../../../Graphql/containers/Mutations/Exame/salvarExame";

class FormCadastrarExame extends React.Component {

    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.state = {
            nome: '',
            protocolo: '',
            dataExame: '',
            possuiMarcapasso: false,
            observacoes: '',
            exameFile: null,
            processando: false
        }
    }

    handleFile({ target: { validity, files: [file] } }) {
        if (FileReader && file) {
            var fr = new FileReader();
            fr.onloadend = () => {
                this.setState({
                    exameFile: file,
                });
            };
            if (fr)
                fr.readAsDataURL(file)
        }
    }

    handleInputChange(evt) {
        var target = evt.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState({
            [name]: value
        });
    }

    submitHandle(e) {
        e.preventDefault();
        this.setState({
            processando: true
        });
        this.props.mutation({
            variables: {
                exame:
                {
                    exameFile: this.state.exameFile,
                    protocolo: this.state.protocolo,
                    dataExame: this.state.dataExame,
                    nome: this.state.nome,
                    possuiMarcapasso: this.state.possuiMarcapasso,
                    observacoes: this.state.observacoes
                }
            }
        }).then((result) => {
            if (this.props.onSubmited)
                this.props.onSubmited({
                    status: 'Sucesso',
                    result: result.data.salvarExame,
                    message: `Novo cadastro de exame para ${this.state.nome} finalizado com sucesso.`
                });
        }).catch(error => {
            if (this.props.onSubmited)
                this.props.onSubmited({
                    status: 'Sucesso',
                    result: error,
                    message: 'Ocorreu um erro ao realizar o cadastro do exame.'
                });
        });
    }

    render() {
        return (
            <div>
                <form className='ui form dimmable' onSubmit={this.submitHandle}>
                    <div className={`ui inverted dimmer ${this.state.processando ? 'active' : ''}`}>
                        <div className='content'>
                            <div className='ui text loader'>Salvando Registro</div>
                        </div>
                    </div>
                    <div className='field'>
                        <DragAndDropUpload onChange={this.handleFile} />
                    </div>
                    <div className='fields'>
                        <div className='inline fluid field'>
                            <label>Protocolo:</label    >
                            <input type='text' name='protocolo' required value={this.state.protocolo} onChange={this.handleInputChange} />
                        </div>
                        <div className='inline field'>
                            <label>Data Exame</label>
                            <input name='dataExame' type='date' required value={this.state.dataExame} onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <div className='field'>
                        <label>Nome</label>
                        <input className="ui input" type='text' required name='nome' value={this.state.nome} onChange={this.handleInputChange} />
                    </div>
                    <h3 className='ui dividing header'>Informações Opcionais</h3>
                    <div className='field'>
                        <div className="ui toggle checkbox">
                            <input type="checkbox" tabIndex="0" value={this.state.possuiMarcapasso} onChange={this.handleInputChange} />
                            <label>Possui Marca-passo?</label>
                        </div>
                    </div>
                    <div className='field'>
                        <label>Outras Observações:</label>
                        <textarea id='info' rows='5' name='observacoes' value={this.state.observacoes} onChange={this.handleInputChange} />
                    </div>
                    <div className='field'>
                        <input type='submit' className='ui fluid green button' value='Cadastrar' />
                    </div>
                </form>
            </div>)
    }
}

export default ({ onSubmited }) => (<SalvarExameContainer>{(mutation, { ...props }) => <FormCadastrarExame onSubmited={onSubmited} mutation={mutation} {...props} />}</SalvarExameContainer>);