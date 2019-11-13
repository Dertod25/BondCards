import React, {Component} from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";

export default class OptionsMenu extends Component {

    render() {
        return (
            <div className="options-container">
                <ButtonGroup>
                    {['Week', 'Month', 'Quarter', 'Year', 'Max'].map(
                        (title) => <Button variant="outline-info " size="sm">{title}</Button>)}
                </ButtonGroup>
                <DropdownButton variant="outline-info" id="dropdown-outline-button" title="Dropdown button" size="sm">
                    <Dropdown.Item >Yield</Dropdown.Item>
                    <Dropdown.Item >Spread</Dropdown.Item>
                    <Dropdown.Item >Price</Dropdown.Item>
                </DropdownButton>
            </div>

        );
    }
}

