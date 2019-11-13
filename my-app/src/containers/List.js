import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as bondsActions from "../redux/modules/bonds";

@connect(
    state => ({
        currentChannels: state.socket.currentChannels,
    }),
    dispatch =>
        bindActionCreators(
            {...bondsActions},
            dispatch
        )
)

export default class List extends Component {

    render() {
        return (
            <div className="list-container">
                <div className="card-header">
                    <p>ISIN List</p>
                </div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
                <div>1</div>
            </div>

        );
    }
}
