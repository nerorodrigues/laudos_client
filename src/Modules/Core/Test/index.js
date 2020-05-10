import React from "react";
import Test from "../../../Graphql/containers/test/test";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
          var result;
        if (this.props.loading)
            result = <div>Loading...</div>;
        else if (this.props.error)
            result = <div>Erro...</div>;
        else
            result = <div>
                {this.props.data.getUser.userName}
            </div>;
        return result;
    }
}

export default ()=> (<Test>{({ ...props }) => <Login {...props} />}</Test>)