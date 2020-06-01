import React from "react";
import { Redirect } from "react-router-dom";

class Logoff extends React.Component {

    componentDidMount() {
        localStorage.removeItem('AuthToken')
        this.props.componentCallback(false);
    }

    render() {
        return (<Redirect to='/login' />);
    }
}

export default Logoff;