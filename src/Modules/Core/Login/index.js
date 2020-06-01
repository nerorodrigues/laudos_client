import React from "react";
import { Grid, Segment, Form, Button, Message, Transition } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import CheckAuth from "../../../Lib/Authentication";

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            error: false,
            duration: 800,
            userName: '',
            password: '',
            isLogged: false
        };

    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(false ? 'https://laudos.herokuapp.com/login' : 'http://localhost:3000/login',
            {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: `userName=${this.state.userName}&password=${this.state.password}`
            }).then(response => {
                if (response.status === 200)
                    return response.json()
                else
                    throw new Error(response.Message)
            }, err => {
                this.setState({
                    error: true
                });
                return err;
            })
            .then(data => {
                this.setState({ isLogged: true });
                localStorage.setItem('AuthToken', data.token)
                this.props.componentCallback(true);
            }).catch(err => {
                this.setState({
                    error: true
                });
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

    render() {
        var result;
        result =
            CheckAuth() || this.state.isLogged ? (<Redirect to='/' />) : (
                <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Transition.Group animation='fade up' duration={800}>
                            <Form error={this.state.error} size="large" onSubmit={this.handleSubmit}>
                                <Segment>
                                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='userName' value={this.state.userName} onChange={this.handleInputChange} />
                                    <Form.Input fluid icon='lock' iconPosition='left' required placeholder='Password' type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                                    <Button color='teal' fluid size='large'>Login</Button>
                                    < Message error header='Error ao realizar login' content={this.state.error} />
                                </Segment>
                            </Form>
                        </Transition.Group>
                    </Grid.Column >
                </Grid >
            )
        return result;
    }
}
export default Login;