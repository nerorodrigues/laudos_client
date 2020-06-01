import React from 'react';
import './testeVisual.css';



export default class Teste extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filename: ''
        };
        this.changedHandler = this.changedHandler.bind(this);
    }

    changedHandler(e) {
        alert('Alterado');
        this.setState({
            filename: e.target.value
        });
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}


