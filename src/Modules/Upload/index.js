import React from "react";
import { Container } from "semantic-ui-react";
import SalvarExameContainer from "../../Graphql/containers/Exame/salvarExame";
import './upload.css';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            nome: 'Nero',
            protocolo: '123',
            dataExame: '',
            possuiMarcapasso: false,
            observacoes: '',
            exameFile: null
        };
    }

    handleFile({ target: { validity, files: [file] } }) {
        if (FileReader) {
            var fr = new FileReader();
            fr.onloadend = () => {
                this.setState({
                    exameFile: file,
                    valid: validity.valid,
                    imagePreview: fr.result
                });
            };

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
        }).catch(result => {
            console.log(result);
        });
    }

    render() {
        // if (this.props.loading)
        //     return (<div>Loading...</div>);
        // else if (this.props.error)
        //     return (<div>Erro</div>);
        // else
        return (
            <Container>
                {/* <Form onSubmit={this.submitHandle}>
                        <Form.Input type='file' required onChange={this.handleFile} />
                        <Form.Input type='submit' />
                    </Form> */}
                {/*                     <div className="ui grid" > */}
                {/* style={{ height: "90vh" }} */}
                
                
                {/* <div className="ui center aligned middle aligned grid" > */}
                    {/* style={{ maxWidth: "60%", minWidth: 700 }} */}
                    {/* <div className="column"> */}
                        {/* <div className="ui placeholder segment aligned"> */}
                            <form className='ui form' onSubmit={this.submitHandle}
                            // onSubmit={e => {
                            //     e.preventDefault();
                            //     upload({
                            //         variables: {
                            //             exame:
                            //             {
                            //                 exameFile: this.state.exameFile,
                            //                 protocolo: this.state.protocolo,
                            //                 dataExame: this.state.dataExame,
                            //                 nome: this.state.nome,
                            //                 possuiMarcapasso: this.state.possuiMarcapasso,
                            //                 observacoes: this.state.observacoes
                            //             }
                            //         }
                            //     }).catch(result => {
                            //         console.log(result);
                            //     });
                            // }}
                            >
                                <div className='field'>
                                    <i aria-hidden='true' className='upload huge icon' />
                                </div>
                                <div className='field upload'>
                                    <input className="ui input" type='file' required onChange={this.handleFile} />
                                </div>
                                <div className='fields'>
                                    <div className='inline fluid field'>
                                        <label>Protocolo:</label    >
                                        <input type='text' name='protocolo' value={this.state.protocolo} onChange={this.handleInputChange} />
                                    </div>
                                    <div className='inline field'>
                                        <label>Data Exame</label>
                                        <input name='dataExame' type='date' value={this.state.dataExame} onChange={this.handleInputChange} />
                                    </div>
                                </div>
                                <div className='field'>
                                    <label>Nome</label>
                                    <input className="ui input" type='text' name='nome' value={this.state.nome} onChange={this.handleInputChange} />
                                </div>
                                <h3 className='ui dividing header'>Informações Opcionais</h3>
                                {/* <div className='ui segment'> */}
                                <div className='field'>
                                    <div className='ui fitted toggle checkbox'>
                                        {/* <input id='marcapasso' name='marcapasso' type='checkbox' className='hidden' /> */}
                                        <input type="checkbox" readOnly="" tabIndex="0" name='possuiMarcapasso' value={this.state.possuiMarcapasso} onChange={this.handleInputChange} />
                                        {/* <label>Possui Marca-passo?</label> */}
                                    </div>
                                </div>
                                <div className='field'>
                                    <label>Outras Observações:</label>
                                    <textarea id='info' name='info' rows='5' name='observacoes' value={this.state.observacoes} onChange={this.handleInputChange} />
                                </div>
                                {/* </div> */}
                                <div className='field'>
                                    <input type='submit' className='ui fluid green button' value='Cadastrar' />
                                </div>
                            </form>
                        {/* </div> */}
            </Container>
        );
    }
}



export default (handler) => (<SalvarExameContainer>{(mutation, { ...props }) => <Upload handler={handler} mutation={mutation} {...props} />}</SalvarExameContainer>);