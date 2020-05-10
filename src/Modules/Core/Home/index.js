import React from "react";
import { Grid, Divider, Button, Portal, Modal } from "semantic-ui-react";
import Upload from "../../Upload";

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.buttonClickHandle = this.buttonClickHandle.bind(this);
    }

    buttonClickHandle() {
        console.log(this.state.isOpen);
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                
                {/* <Modal trigger={<Button onClick={this.buttonClickHandle}>CLick aqui</Button>}>
                    <Modal.Content>
                        <Upload />
                    </Modal.Content>
                </Modal> */}
            </div>
        );
    }
}


export default Home;