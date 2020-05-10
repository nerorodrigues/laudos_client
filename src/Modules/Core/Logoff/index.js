import React from "react";
import { Redirect } from "react-router-dom";

class Logoff extends React.Component {
    
    constructor(props){
        super(props);
    }
    componentDidMount() {
        fetch('http://localhost:3000/logoff',
            {
                method: 'post',
                credentials: 'include'
            }).then(result => result.json())
            .then(data => {
                document.cookie = 'signedin=false';
                this.props.componentCallback(false);
            });
    }

    render() {
        return (<Redirect to='/login' />);
    }
}

export default Logoff;