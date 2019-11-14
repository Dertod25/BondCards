import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as bondsActions from "../redux/modules/bonds";
import List from "./List";
import CardArea from "./CardArea";
import "../style/App.css";

@connect(
    state => ({
        bondsList: state.bonds.bondsList,
    }),
    dispatch =>
        bindActionCreators(
            {...bondsActions},
            dispatch
        )
)

export default class App extends Component {

    render() {
        return (
            <div className="area">
                <List />
                <CardArea/>
            </div>

        );
    }
}
