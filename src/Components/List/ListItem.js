import React from "react";
import cx from "classnames";
import { useKeyOnly } from "../../Lib/classNameBuilders";

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);

        this.state = {
            className: '',
        }
    }

    onClickHandler(elm) {
        if (this.props.onSelect && this.props.data)
            this.props.onSelect(this.props.data);
    }

    render() {
        const {
            active,
            className,
            id,
        } = this.props;

        const classes = cx(
            'item',
            useKeyOnly(active, 'active'),
            className
        )

        return (
            <div role='listitem' className={classes} onClick={this.onClickHandler}>
                {this.props.children}
            </div>
        );
    }
}