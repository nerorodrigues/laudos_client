import React from "react";
import { Grid, Segment, Form, Button, Message, Transition, Container } from "semantic-ui-react";
import SignInContainer from "../../../Graphql/containers/signin";
import { Redirect } from "react-router-dom";

const requestOptions = {
    method: 'post',
    headers: {
        'Contenty-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
}

class Login extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            error: true,
            animation: 'fade up',
            duration: 800,
            userName: '',
            password: '',
            isLogged: false
        };

    }

    handleSubmit(e) {
        e.preventDefault();
        //fetch('http://localhost:3000/login',
        fetch('https://laudos.herokuapp.com/login',
            {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: `userName=${this.state.userName}&password=${this.state.password}`
            }).then(response => {
                return response.json()
            })
            .then(data => {
                document.cookie = 'signedin=true';
                this.setState({ isLogged: true });
                this.props.componentCallback(true);
            });

        // this.props.mutation({
        //     variables: {
        //         userName: this.state.userName,
        //         password: this.state.password
        //     }
        // }).catch(result => { });
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
            !this.state.isLogged ? (
                <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form error={this.state.error} size="large" onSubmit={this.handleSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='userName' value={this.state.userName} onChange={this.handleInputChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password' name='password' value={this.state.password} onChange={this.handleInputChange} />
                                <Button color='teal' fluid size='large'>Login</Button>
                            </Segment>
                        </Form>
                        {/* <Message>
                        New to us? <a href='#'>Sign Up</a>
                    </Message> */}
                        <Transition.Group animation={this.state.animation} duration={this.state.duration}>
                            {
                                this.props.error &&
                                this.props.error.graphQLErrors.map(({ message }, i) => (<Message
                                    error
                                    header='Action Forbidden'
                                    content={message}
                                />))
                            }
                        </Transition.Group>
                    </Grid.Column>
                </Grid>) : (<Redirect to='/' />)
        return result;
    }
}
export default Login;

// export default () => (<SignInContainer>{
//     (mutation, { ...props }) => <Login mutation={mutation} {...props} />
// }</SignInContainer>);
