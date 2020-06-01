import React from "react";
import { Grid, Segment, Form, Button, Message, Transition } from "semantic-ui-react";
import JWT from "jsonwebtoken";
import checkAuth from "../../../Lib/Authentication";

class PasswordChange extends React.Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            error: false,
            duration: 800,
            oldPassword: '',
            newPassword: '',
        };
    }

    componentDidMount() {
        try {
            var user = checkAuth();
            this.setState({
                userName: user.userName
            })
        } catch (error) {

        }
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(false ? 'https://laudos.herokuapp.com/changepassword' : 'http://localhost:3000/changepassword',
            {
                method: 'post',
                credentials: 'include',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'authorization': localStorage.getItem('AuthToken')
                },
                body: `oldPassword=${this.state.oldPassword}&newPassword=${this.state.newPassword}`
            }).then(response => {
                if (response.status !== 200)
                    throw new Error(response.Message)
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
        return (
            <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh' }}>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Transition.Group animation='fade up' duration={800}>
                        <Form error={this.state.error} size="large" onSubmit={this.handleSubmit}>
                            <Segment>
                                <Form.Input fluid icon='user' iconPosition='left' readOnly type='text' name='user' value={this.state.userName} onChange={this.handleInputChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' required placeholder='Senha atual' type='password' name='oldPassword' value={this.state.oldPassword} onChange={this.handleInputChange} />
                                <Form.Input fluid icon='lock' iconPosition='left' required placeholder='Nova senha' type='password' name='newPassword' value={this.state.newPassword} onChange={this.handleInputChange} />
                                <Button color='teal' fluid size='large'>Alterar Senha</Button>
                                < Message error header='Error ao realizar login' content={this.state.error} />
                            </Segment>
                        </Form>
                    </Transition.Group>
                </Grid.Column >
            </Grid >
        )
    }
}
export default PasswordChange;