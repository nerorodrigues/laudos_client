import React from "react";
import GetCompaniesContainer from "../../Graphql/containers/Queries/Company/getCompanies";
import CardList from "../../Components/CardList";
import List from "../../Components/List";


class CompaniesList extends React.Component {
    constructor(props) {
        super(props);
        this.selectionChangedHandler = this.selectionChangedHandler.bind(this);
    }

    selectionChangedHandler(value) {
        if (this.props.onSelectionChanged)
            this.props.onSelectionChanged(value)
    }

    render() {
        if (this.props.loading)
            return <div>Loading...</div>
        else if (this.props.error)
            return <div>Erro...</div>

        return (
            <List size='huge' animated selection relaxed divided on onSelectionChanged={this.selectionChangedHandler}>
                {
                    this.props.data.getCompanies.map(company => (
                        <List.Item key={company.id} data={company}>
                            {company.name}
                        </List.Item>
                    ))
                }
            </List>
        )
    }
}

export default ({ ...rest }) => (<GetCompaniesContainer>{({ ...props }) => <CompaniesList {...props} {...rest} />}</GetCompaniesContainer>)