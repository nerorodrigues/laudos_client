import React from "react";
import { Menu } from "semantic-ui-react";

import CompaniesList from "./companiesList";
import ExamsByCompany from "./examsByCompany";

class ListarExamesPorCliente extends React.Component {
    constructor(props) {
        super(props);
        this.modoExibicao = this.modoExibicao.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.companySelectionChanged = this.companySelectionChanged.bind(this);
        this.state = {
            exibicaoTabela: true,
            selectedCompany: null
        };
    }

    componentDidMount() {
        this.state = {
            exibicaoTabela: true,
        };
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

    companySelectionChanged(value) {
        this.setState({
            selectedCompany: value
        });
    }

    getVariableValues() {
        return {
            companyId: this.state?.selectedCompany?.id ?? null
        }
    }

    render() {
        return (
            <div>
                <div className='ui menu'>
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
                <div className='ui divided grid'>
                    <div className='row'>
                        <div className='four wide column'>
                            <div className='ui segment'>
                                <CompaniesList onSelectionChanged={this.companySelectionChanged} />
                            </div>
                        </div>
                        <div className='twelve wide column'>
                            <ExamsByCompany variables={{ 'companyId': this.state?.selectedCompany?.id }} selectedCompany={this.state.selectedCompany} exibicaoTabela={this.state.exibicaoTabela} />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default () => <ListarExamesPorCliente />
