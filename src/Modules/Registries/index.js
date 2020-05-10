import React from "react";
import ListarExamesContainer from "../../Graphql/containers/Exame/listarExames";

class Registries extends React.Component {
    constructor(props) {
        super(props);
        //this.editHandler = this.editHandler.bind(this);
    }

    editHandler(item) {
        alert(item);
    }

    render() {
        if (this.props.loading)
            return <div>Loading...</div>
        else if (this.props.error)
            return <div>Erro...</div>

        return (
            <div>
                <div>Total de Registros: {this.props.data.listarExames.length}</div>
                <div className='ui doubling five stackable tiny cards'>
                    {this.props.data.listarExames.map(exame => (
                        <div key={exame.id} className='ui yellow card'>
                            <div className='content'>
                                <div className='header'>{exame.protocolo} - {exame.nome}</div>
                                <div className='meta'>
                                    <div className='ui ribbon label'>{exame.dataExame ? exame.dataExame : (new Date().toISOString().substr(0, 10) + ' ' + new Date().toISOString().substr(11, 5))}</div>
                                </div>
                                <div className='description'>
                                
                                {/* <a href={'http://localhost:3000/download?id=' + exame.id + '&download=exame'}>Baixar Laudo</a> */}
                                <a href={'https://laudos.herokuapp.com/download?id=' + exame.id + '&download=exame'}>Baixar Laudo</a>
                                </div>
                                {/* <a className='description'>{exame.dataExame ? exame.dataExame : (new Date().toISOString())}</a> */}
                            </div>
                            <div className='extra content'>
                                <button className='ui primary small button btn-default'>Remover</button>
                                <button className='ui small button btn-default'>Remover</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div role='list' className='ui animated huge divided relaxed list'>
                    {this.props.data.listarExames.map(exame => (
                        <div key={exame.id} role='listitem' className='item'>
                            <i aria-hidden='true' className='chart bar icon large middle aligned'></i>
                            <div className='content'>
                                <a className='header'>{exame.protocolo} - {exame.nome}</a>
                                <a className='description'>Teste</a>
                                <button className='ui small button btn-default'>Remover</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <table className='ui striped celled selectable compact small table'>
                    <thead>
                        <th>Protocolo</th>
                        <th>Nome</th>
                        <th>Data Exame</th>

                    </thead>
                    <tbody>
                        {this.props.data.listarExames.map(exame => (
                            <tr>
                                <td>
                                    {exame.protocolo}
                                </td>
                                <td>
                                    {exame.nome}
                                </td>
                                <td>
                                    {exame.dataExame}
                                </td>
                                <td>
                                    <button className='ui tiny button btn-default' onClick={() => this.editHandler(exame)}>Editar</button>
                                    <button className='ui tiny button btn-default' onClick={() => this.editHandler(exame)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
            </div>
        )
    }
}

export default () => (<ListarExamesContainer>{({ ...props }) => <Registries {...props} />}</ListarExamesContainer>)

// class Login extends React.Component {

//     render() {
//         var result;
//         if (this.props.loading)
//             result = <div>Loading...</div>;
//         else if (this.props.error)
//             result = <div>Erro...</div>;
//         else
//             result = <div>
//                 {this.props.data.getUser.userName}
//             </div>;
//         return result;
//     }
// }

// export default () => (<Test>{({ ...props }) => <Login {...props} />}</Test>)