import React from "react";
import { Component } from "react";
import Exames from "./Modules/Exames"
import ExamesPorCliente from "./Modules/ExamesPorCliente"
import Login from "./Modules/Core/Login";
import Logoff from "./Modules/Core/Logoff";
import Home from "./Modules/Core/Home";
import TesteVisual from "./testeVisual";
import PrivateRoute from "./Components/PrivateRoute";
import PasswordChange from "./Modules/Core/PasswordChange";

import './app.css';

import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import GraphQL from "./Lib/GraphQL";
import checkAuth from "./Lib/Authentication";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false };
        this.componentCallback = this.componentCallback.bind(this);
    }

    componentCallback(value) {
        this.setState({
            isAuthenticated: checkAuth()
        });
    }

    componentDidMount() {
        this.setState({ isAuthenticated: checkAuth });
    }

    render() {
        return (
            <div>

                <Router>
                    {this.state.isAuthenticated && (
                        <div className='ui pointing secondary menu'>
                            <NavLink className='item' exact to="/">Home</NavLink>
                            <NavLink className='item' exact to="/porcliente">Por Cliente</NavLink>
                            <NavLink className='item' to="/teste">Testes</NavLink>
                            <NavLink className='item' to="/passwordchange">Alterar senha</NavLink>
                            <NavLink className='item' to="/logoff">Logoff</NavLink>

                        </div>)}
                    <GraphQL>
                        <Switch>
                            <Route path='/login'>
                                <Login componentCallback={this.componentCallback} />
                            </Route>
                            <PrivateRoute path='/logoff' component={Logoff} componentCallback={this.componentCallback} />
                            <PrivateRoute path='/teste' component={TesteVisual} />
                            <PrivateRoute path='/passwordchange' component={PasswordChange} />
                            <PrivateRoute path="/porcliente" component={ExamesPorCliente} />
                            <PrivateRoute path="/" component={Exames} />
                        </Switch>
                    </GraphQL>
                </Router>
                <Home />
            </div>)
    }
}

export default App;
