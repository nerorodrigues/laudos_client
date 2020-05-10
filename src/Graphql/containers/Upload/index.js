import gql from "graphql-tag";
import { Mutation, useMutation } from "react-apollo";

var UPLOAD_SCHEMA = gql(`
    mutation upload($image: Upload!){
        upload(image: $image)
    }
`);

const UploadContainer = ({ children }) => {
    const [mutation, data] = useMutation(UPLOAD_SCHEMA)
    return children(mutation, data);
}

export default UploadContainer;