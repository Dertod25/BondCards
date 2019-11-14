import React, {Component} from "react";
import {Button, ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";

export default class OptionsMenu extends Component {

    render() {
        const {changeDateOption, changeTypeOption, dateOption, typeOption} = this.props;
        return (
            <div className="main__options">
                <ButtonGroup>
                    {['Max', 'Year', 'Quarter', 'Month', 'Week'].map(
                        (title, i) => <Button variant="outline-info "
                                              className={`${dateOption === i ? 'active' : ''}`} size="sm" key={i}
                                              onClick={() => changeDateOption(i)}
                        >{title}</Button>)}
                </ButtonGroup>
                <DropdownButton variant="outline-info" id="dropdown-outline-button" title={typeOption} size="sm">
                    <Dropdown.Item onClick={() => changeTypeOption('Yield')}>Yield</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeTypeOption('Spread')}>Spread</Dropdown.Item>
                    <Dropdown.Item onClick={() => changeTypeOption('Price')}>Price</Dropdown.Item>
                </DropdownButton>
            </div>

        );
    }
}

