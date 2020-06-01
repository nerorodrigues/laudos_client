import React from "react";
import { TransitionGroup } from "semantic-ui-react";
import './index.css';
export class CardItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div key={this.props.data.id} className='ui yellow card fade left'>
                <div className='content'>
                    <div className='header'>
                        <div className='light label inline'>
                            <label>Protocolo:</label>
                            <div>{this.props.data.protocolo}</div>
                        </div>
                        <div className='label inline'>
                            {this.props.data.nome}
                        </div>

                    </div>
                    <div className='meta'>
                        <div className='ui ribbon label'>{`Cadastro Realizado em ${this.props.data.dataCadastro}`}</div>
                    </div>
                    <div className='description bottom'>
                        {
                            this.props.laudoUrl ? <a href={this.props.laudoUrl}>Baixar Laudo</a> : <a href={this.props.exameUrl}>Baixar Exame</a>
                        }
                    </div>
                </div>
                <div className='extra content'>
                    <button className='ui primary small button btn-default'>Ver</button>
                    <button className='ui small button btn-default'>Remover</button>
                </div>
            </div>
        )
    }
}


export default class CardList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='ui doubling four stackable tiny cards'>
                <TransitionGroup
                    duration={500}>
                    {this.props.data.map(item => (
                        <CardItem key={item.id} data={item} />
                    ))}
                </TransitionGroup>
            </div>
        )
    }


}