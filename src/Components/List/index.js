import React from "react";
import ListItem from "./ListItem";
import PropTypes from "prop-types";
import cx from "classnames";
import { useKeyOnly } from "../../Lib/classNameBuilders";
import CONSTANTS from "../../Lib";



class List extends React.Component {

    static propTypes = {
        children: PropTypes.array.isRequired,
        selectionChanged: PropTypes.func,
        selectedValue: PropTypes.string,
        size: PropTypes.oneOf(CONSTANTS.SIZE),
        relaxed: PropTypes.bool,
        animated: PropTypes.bool,
        divided: PropTypes.bool,
        relaxed: PropTypes.bool,
        selection: PropTypes.bool,
        className: PropTypes.string
    };


    constructor(props) {
        super(props);
        this.onSelectionChangeHandler = this.onSelectionChangeHandler.bind(this);
        this.state = {
            selectedValue: this.props.selectValue
        }
    }

    onSelectionChangeHandler(selectedItem) {
        this.setState({ selectedValue: selectedItem.id });
        if (this.props.onSelectionChanged)
            this.props.onSelectionChanged(selectedItem)
    }

    static Item = ListItem

    render() {
        const {
            size,
            className,
            animated,
            divided,
            relaxed,
            selection,
        } = this.props

        var classes = cx(
            'ui',
            useKeyOnly(animated, 'animated'),
            useKeyOnly(divided, 'divided'),
            useKeyOnly(relaxed, 'relaxed'),
            useKeyOnly(selection, 'selection'),
            size,
            'list',
            className
        )

        var children = this.props.children;
        children = children.map(child => {
            return React.cloneElement(child, {
                active: child.props.data.id === this.state?.selectedValue ?? false,
                onSelect: this.onSelectionChangeHandler
            })
        })

        return (
            <div>
                <div role='list' className={classes} >
                    {children}
                </div>
            </div >
        );
    }
}

export default List;