import React from "react";
import { Component } from "react";
import Registries from "./Modules/Registries"
import Login from "./Modules/Core/Login";
import Logoff from "./Modules/Core/Logoff";
import Upload from "./Modules/Upload";
import Home from "./Modules/Core/Home";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom'
import { Menu } from "semantic-ui-react";


const checkAuth = () => {
    return Cookies.get('signedin') == 'true'
}

const PrivateRoute = ({ component: Component, componentCallback, ...rest }) => (
    <Route {...rest}
        render={props =>
            checkAuth() ? (
                <Component {...props} componentCallback={componentCallback} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: checkAuth() };
        this.componentCallback = this.componentCallback.bind(this);
    }

    componentCallback(value) {
        this.setState({ isLoggedIn: value });
    }

    render() {
        return (
            <div>
                <Router>
                    {this.state.isLoggedIn && (<Menu>
                        <Menu.Item>
                            <Link to="/logoff">Logoff</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/upload">Upload</Link>
                        </Menu.Item>
                    </Menu>)}
                    <Switch>
                        <Route path='/login'>
                            <Login componentCallback={this.componentCallback} />
                        </Route>
                        <PrivateRoute path='/logoff' component={Logoff} componentCallback={this.componentCallback} />
                        <PrivateRoute path='/upload' component={Upload} />
                        <PrivateRoute path="/" component={Registries} />

                    </Switch>
                </Router>
                <Home/>

            </div>)
    }
}

export default App;